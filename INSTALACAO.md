# Guia de Instalação - 3dxCubed Website

## 🖥️ Instalação no Windows

### 1. Instalar Node.js

1. Acesse [nodejs.org](https://nodejs.org/)
2. Baixe a versão LTS (recomendada)
3. Execute o instalador e siga as instruções
4. Verifique a instalação:
```cmd
node --version
npm --version
```

### 2. Instalar Git (opcional)

1. Acesse [git-scm.com](https://git-scm.com/)
2. Baixe e instale o Git para Windows
3. Verifique a instalação:
```cmd
git --version
```

### 3. Configurar o Projeto

1. Abra o PowerShell ou Prompt de Comando
2. Navegue até a pasta do projeto:
```cmd
cd "C:\Users\icaro\OneDrive\Arquivos\Projetos\Códigos\Site 3DX"
```

3. Instale as dependências:
```cmd
npm install
```

4. Crie o arquivo de ambiente:
```cmd
copy env.example .env.local
```

5. Inicie o servidor de desenvolvimento:
```cmd
npm run dev
```

6. Acesse: http://localhost:3000

## 🐧 Instalação no Linux/Raspberry Pi

### 1. Atualizar sistema
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Instalar Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Instalar dependências do projeto
```bash
npm install
```

### 4. Configurar ambiente
```bash
cp env.example .env.production
nano .env.production
```

### 5. Build e start
```bash
npm run build
npm start
```

## 🐳 Instalação com Docker

### 1. Instalar Docker
- Windows: [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Linux: `sudo apt install docker.io docker-compose`

### 2. Build e executar
```bash
docker-compose up -d --build
```

## ⚙️ Configuração

### Variáveis de Ambiente (.env.local)

```env
# Aplicação
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua-chave-secreta-aqui

# Email (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=3dxcubed@gmail.com
SMTP_PASS=sua-senha-app

# Pagamentos (opcional)
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Configuração de Email

Para usar o sistema de contato, configure uma senha de app do Gmail:

1. Acesse [myaccount.google.com](https://myaccount.google.com)
2. Vá em "Segurança" > "Senhas de app"
3. Gere uma nova senha para "Mail"
4. Use essa senha no campo `SMTP_PASS`

## 🚀 Deploy na Raspberry Pi

### 1. Preparar a Raspberry Pi
```bash
# Execute o script de deploy
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

### 2. Configurar domínio
- Configure o DNS do domínio 3dxcubed.com.br
- Aponte para o IP da Raspberry Pi

### 3. Configurar SSL
```bash
sudo certbot --nginx -d 3dxcubed.com.br -d www.3dxcubed.com.br
```

## 🔧 Comandos Úteis

### Desenvolvimento
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # Verificar código
```

### Docker
```bash
docker-compose up -d          # Iniciar containers
docker-compose down           # Parar containers
docker-compose logs -f        # Ver logs
docker-compose restart        # Reiniciar
```

### Manutenção
```bash
# Backup
tar -czf backup-$(date +%Y%m%d).tar.gz uploads/ data/ .env.production

# Atualizar projeto
git pull origin main
npm install
npm run build
docker-compose up -d --build
```

## 🐛 Solução de Problemas

### Erro: "npm não é reconhecido"
- Instale o Node.js do site oficial
- Reinicie o terminal após instalação

### Erro: "Port 3000 already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux
sudo lsof -i :3000
sudo kill -9 <PID>
```

### Erro de permissão no Linux
```bash
sudo chown -R $USER:$USER .
chmod +x scripts/*.sh
```

### Problemas com Docker
```bash
docker system prune -a  # Limpar cache
docker-compose down -v  # Remover volumes
```

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs: `docker-compose logs -f`
2. Consulte a documentação no README.md
3. Entre em contato: 3dxcubed@gmail.com

## ✅ Checklist de Instalação

- [ ] Node.js 18+ instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Arquivo .env.local configurado
- [ ] Servidor rodando (`npm run dev`)
- [ ] Site acessível em http://localhost:3000
- [ ] Teste de funcionalidades básicas
- [ ] Configuração de email (opcional)
- [ ] Deploy em produção (opcional)

