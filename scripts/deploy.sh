#!/bin/bash

# Script de deploy para Raspberry Pi
# 3dxCubed Website

set -e

echo "🚀 Iniciando deploy do site 3dxCubed..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Verificar se está rodando como root
if [[ $EUID -eq 0 ]]; then
   error "Este script não deve ser executado como root"
fi

# Verificar sistema operacional
if [[ ! -f /etc/os-release ]]; then
    error "Sistema operacional não suportado"
fi

source /etc/os-release
if [[ "$ID" != "raspbian" && "$ID" != "debian" && "$ID" != "ubuntu" ]]; then
    warning "Sistema operacional não testado: $ID"
fi

log "Sistema detectado: $PRETTY_NAME"

# Atualizar sistema
log "Atualizando sistema..."
sudo apt update && sudo apt upgrade -y

# Instalar dependências básicas
log "Instalando dependências..."
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# Instalar Docker
if ! command -v docker &> /dev/null; then
    log "Instalando Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    success "Docker instalado com sucesso"
else
    log "Docker já está instalado"
fi

# Instalar Docker Compose
if ! command -v docker-compose &> /dev/null; then
    log "Instalando Docker Compose..."
    sudo apt install -y docker-compose
    success "Docker Compose instalado com sucesso"
else
    log "Docker Compose já está instalado"
fi

# Instalar Nginx (para proxy reverso)
if ! command -v nginx &> /dev/null; then
    log "Instalando Nginx..."
    sudo apt install -y nginx
    success "Nginx instalado com sucesso"
else
    log "Nginx já está instalado"
fi

# Instalar Certbot (para SSL)
if ! command -v certbot &> /dev/null; then
    log "Instalando Certbot..."
    sudo apt install -y certbot python3-certbot-nginx
    success "Certbot instalado com sucesso"
else
    log "Certbot já está instalado"
fi

# Criar diretório do projeto
PROJECT_DIR="/opt/3dxcubed"
log "Criando diretório do projeto: $PROJECT_DIR"
sudo mkdir -p $PROJECT_DIR
sudo chown $USER:$USER $PROJECT_DIR

# Clonar repositório (se não existir)
if [ ! -d "$PROJECT_DIR/.git" ]; then
    log "Clonando repositório..."
    git clone https://github.com/seu-usuario/3dxcubed-website.git $PROJECT_DIR
else
    log "Atualizando repositório..."
    cd $PROJECT_DIR
    git pull origin main
fi

cd $PROJECT_DIR

# Criar arquivo de ambiente
if [ ! -f ".env.production" ]; then
    log "Criando arquivo de ambiente..."
    cp env.example .env.production
    warning "Configure o arquivo .env.production com suas credenciais"
fi

# Criar diretórios necessários
log "Criando diretórios..."
mkdir -p uploads data ssl

# Configurar Nginx
log "Configurando Nginx..."
sudo cp nginx.conf /etc/nginx/nginx.conf
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

# Configurar SSL (se domínio estiver configurado)
DOMAIN="3dxcubed.com.br"
if [ -n "$DOMAIN" ]; then
    log "Configurando SSL para $DOMAIN..."
    if sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email 3dxcubed@gmail.com; then
        success "SSL configurado com sucesso"
        
        # Configurar renovação automática
        log "Configurando renovação automática do SSL..."
        (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -
    else
        warning "Falha ao configurar SSL. Configure manualmente depois."
    fi
else
    warning "Domínio não configurado. Configure SSL manualmente depois."
fi

# Build e start da aplicação
log "Construindo e iniciando aplicação..."
docker-compose down
docker-compose up -d --build

# Verificar status
log "Verificando status dos containers..."
docker-compose ps

# Verificar logs
log "Verificando logs..."
docker-compose logs --tail=50

# Configurar firewall
log "Configurando firewall..."
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Configurar backup automático
log "Configurando backup automático..."
BACKUP_SCRIPT="/opt/backup-3dxcubed.sh"
sudo tee $BACKUP_SCRIPT > /dev/null <<EOF
#!/bin/bash
# Backup automático do site 3dxCubed
DATE=\$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/backups"
mkdir -p \$BACKUP_DIR

# Backup dos dados
cd $PROJECT_DIR
tar -czf \$BACKUP_DIR/3dxcubed_backup_\$DATE.tar.gz uploads/ data/ .env.production

# Manter apenas os últimos 7 backups
find \$BACKUP_DIR -name "3dxcubed_backup_*.tar.gz" -mtime +7 -delete

echo "Backup criado: \$BACKUP_DIR/3dxcubed_backup_\$DATE.tar.gz"
EOF

sudo chmod +x $BACKUP_SCRIPT

# Adicionar backup ao crontab
(crontab -l 2>/dev/null; echo "0 2 * * * $BACKUP_SCRIPT") | crontab -

# Configurar monitoramento
log "Configurando monitoramento..."
MONITOR_SCRIPT="/opt/monitor-3dxcubed.sh"
sudo tee $MONITOR_SCRIPT > /dev/null <<EOF
#!/bin/bash
# Monitoramento do site 3dxCubed
cd $PROJECT_DIR

# Verificar se os containers estão rodando
if ! docker-compose ps | grep -q "Up"; then
    echo "Containers não estão rodando. Reiniciando..."
    docker-compose up -d
fi

# Verificar uso de disco
DISK_USAGE=\$(df / | awk 'NR==2 {print \$5}' | sed 's/%//')
if [ \$DISK_USAGE -gt 80 ]; then
    echo "Uso de disco alto: \$DISK_USAGE%"
fi

# Verificar memória
MEM_USAGE=\$(free | awk 'NR==2{printf "%.2f", \$3*100/\$2}')
if (( \$(echo "\$MEM_USAGE > 90" | bc -l) )); then
    echo "Uso de memória alto: \$MEM_USAGE%"
fi
EOF

sudo chmod +x $MONITOR_SCRIPT

# Adicionar monitoramento ao crontab
(crontab -l 2>/dev/null; echo "*/5 * * * * $MONITOR_SCRIPT") | crontab -

# Finalizar
success "Deploy concluído com sucesso!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure o arquivo .env.production com suas credenciais"
echo "2. Configure o DNS do domínio para apontar para este servidor"
echo "3. Acesse http://$(hostname -I | awk '{print $1}') para testar"
echo "4. Configure SSL com: sudo certbot --nginx -d 3dxcubed.com.br"
echo ""
echo "🔧 Comandos úteis:"
echo "  - Ver logs: cd $PROJECT_DIR && docker-compose logs -f"
echo "  - Reiniciar: cd $PROJECT_DIR && docker-compose restart"
echo "  - Atualizar: cd $PROJECT_DIR && git pull && docker-compose up -d --build"
echo "  - Backup: $BACKUP_SCRIPT"
echo ""
echo "📊 Monitoramento:"
echo "  - Status: docker-compose ps"
echo "  - Uso de recursos: docker stats"
echo "  - Logs do sistema: journalctl -u nginx -f"
echo ""

log "Deploy finalizado! 🎉"

