#!/bin/bash

# Script de monitoramento para Raspberry Pi
# 3dxCubed Website

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações
PROJECT_DIR="/opt/3dxcubed"
LOG_FILE="/var/log/3dxcubed-monitor.log"
ALERT_EMAIL="3dxcubed@gmail.com"

# Função para log
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a $LOG_FILE
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a $LOG_FILE
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a $LOG_FILE
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a $LOG_FILE
}

# Verificar se os containers estão rodando
check_containers() {
    log "Verificando containers Docker..."
    
    cd $PROJECT_DIR
    
    if ! docker-compose ps | grep -q "Up"; then
        error "Containers não estão rodando. Tentando reiniciar..."
        docker-compose up -d
        
        if docker-compose ps | grep -q "Up"; then
            success "Containers reiniciados com sucesso"
        else
            error "Falha ao reiniciar containers"
            # Enviar alerta por email se configurado
            if command -v mail &> /dev/null; then
                echo "Containers da 3dxCubed não estão rodando em $(hostname)" | mail -s "Alerta 3dxCubed" $ALERT_EMAIL
            fi
        fi
    else
        success "Containers estão rodando normalmente"
    fi
}

# Verificar uso de recursos
check_resources() {
    log "Verificando uso de recursos..."
    
    # Uso de CPU
    CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | awk -F'%' '{print $1}')
    if (( $(echo "$CPU_USAGE > 80" | bc -l) )); then
        warning "Uso de CPU alto: ${CPU_USAGE}%"
    fi
    
    # Uso de memória
    MEM_USAGE=$(free | awk 'NR==2{printf "%.2f", $3*100/$2}')
    if (( $(echo "$MEM_USAGE > 85" | bc -l) )); then
        warning "Uso de memória alto: ${MEM_USAGE}%"
    fi
    
    # Uso de disco
    DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    if [ $DISK_USAGE -gt 80 ]; then
        warning "Uso de disco alto: ${DISK_USAGE}%"
    fi
    
    # Temperatura da CPU (Raspberry Pi)
    if [ -f /sys/class/thermal/thermal_zone0/temp ]; then
        TEMP=$(cat /sys/class/thermal/thermal_zone0/temp)
        TEMP_C=$((TEMP/1000))
        if [ $TEMP_C -gt 70 ]; then
            warning "Temperatura da CPU alta: ${TEMP_C}°C"
        fi
    fi
}

# Verificar conectividade
check_connectivity() {
    log "Verificando conectividade..."
    
    # Verificar se o site responde
    if curl -f -s http://localhost:3000/api/health > /dev/null; then
        success "Site respondendo localmente"
    else
        error "Site não está respondendo localmente"
    fi
    
    # Verificar DNS
    if nslookup 3dxcubed.com.br > /dev/null 2>&1; then
        success "DNS funcionando"
    else
        warning "Problema com DNS"
    fi
    
    # Verificar conectividade externa
    if ping -c 1 8.8.8.8 > /dev/null 2>&1; then
        success "Conectividade externa OK"
    else
        error "Sem conectividade externa"
    fi
}

# Verificar logs de erro
check_logs() {
    log "Verificando logs de erro..."
    
    cd $PROJECT_DIR
    
    # Verificar logs do Docker
    ERROR_COUNT=$(docker-compose logs --tail=100 2>&1 | grep -i error | wc -l)
    if [ $ERROR_COUNT -gt 0 ]; then
        warning "Encontrados $ERROR_COUNT erros nos logs recentes"
    fi
    
    # Verificar logs do Nginx
    if [ -f /var/log/nginx/error.log ]; then
        NGINX_ERRORS=$(tail -100 /var/log/nginx/error.log | grep -i error | wc -l)
        if [ $NGINX_ERRORS -gt 0 ]; then
            warning "Encontrados $NGINX_ERRORS erros no Nginx"
        fi
    fi
}

# Limpeza automática
cleanup() {
    log "Executando limpeza automática..."
    
    # Limpar logs antigos
    find /var/log -name "*.log" -mtime +30 -delete 2>/dev/null
    
    # Limpar cache do Docker
    docker system prune -f
    
    # Limpar arquivos temporários
    rm -rf /tmp/*
    
    success "Limpeza concluída"
}

# Backup automático
backup() {
    log "Executando backup..."
    
    BACKUP_DIR="/opt/backups"
    DATE=$(date +%Y%m%d_%H%M%S)
    BACKUP_FILE="$BACKUP_DIR/3dxcubed_backup_$DATE.tar.gz"
    
    mkdir -p $BACKUP_DIR
    
    cd $PROJECT_DIR
    tar -czf $BACKUP_FILE uploads/ data/ .env.production 2>/dev/null
    
    if [ -f $BACKUP_FILE ]; then
        success "Backup criado: $BACKUP_FILE"
        
        # Manter apenas os últimos 7 backups
        find $BACKUP_DIR -name "3dxcubed_backup_*.tar.gz" -mtime +7 -delete
    else
        error "Falha ao criar backup"
    fi
}

# Verificar atualizações
check_updates() {
    log "Verificando atualizações..."
    
    cd $PROJECT_DIR
    
    # Verificar se há atualizações no Git
    git fetch origin > /dev/null 2>&1
    LOCAL=$(git rev-parse HEAD)
    REMOTE=$(git rev-parse origin/main)
    
    if [ "$LOCAL" != "$REMOTE" ]; then
        warning "Atualizações disponíveis no repositório"
        # Opcional: atualizar automaticamente
        # git pull origin main
        # docker-compose up -d --build
    else
        success "Sistema atualizado"
    fi
}

# Função principal
main() {
    log "Iniciando monitoramento da 3dxCubed..."
    
    check_containers
    check_resources
    check_connectivity
    check_logs
    
    # Executar limpeza uma vez por dia
    if [ $(date +%H) -eq 2 ]; then
        cleanup
    fi
    
    # Executar backup uma vez por dia
    if [ $(date +%H) -eq 3 ]; then
        backup
    fi
    
    # Verificar atualizações uma vez por semana
    if [ $(date +%u) -eq 1 ] && [ $(date +%H) -eq 4 ]; then
        check_updates
    fi
    
    log "Monitoramento concluído"
}

# Executar monitoramento
main

# Se executado com parâmetro --daemon, executar em loop
if [ "$1" = "--daemon" ]; then
    while true; do
        sleep 300  # 5 minutos
        main
    done
fi

