# 3dxCubed - Site de Impressão 3D

Site completo para empresa de impressão 3D com três setores principais: impressões prontas, impressão de STL e modelagem 3D.

## 🚀 Funcionalidades

### E-commerce
- **Impressões Prontas**: Catálogo de produtos com carrinho de compras
- **Impressão de STL**: Upload de arquivos e sistema de orçamento
- **Modelagem 3D**: Solicitação de projetos personalizados
- **Sistema de Carrinho**: Persistência local e integração com usuários
- **Checkout**: Integração com PIX, cartão e boleto

### Autenticação
- Login e cadastro de usuários
- Área do cliente com histórico de pedidos
- Painel administrativo para gestão

### Design
- Interface moderna e responsiva
- Cores da marca (Preto #000000, Branco #FFFFFF, Roxo #4B0082)
- Animações suaves com Framer Motion
- Otimizado para mobile

## 🛠️ Tecnologias

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animações**: Framer Motion
- **Estado**: Context API
- **Notificações**: React Hot Toast
- **Ícones**: Lucide React

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Docker (opcional, para deploy)

### Desenvolvimento Local

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/3dxcubed-website.git
cd 3dxcubed-website
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse http://localhost:3000

### Deploy na Raspberry Pi

1. **Preparação da Raspberry Pi**:
```bash
# Atualize o sistema
sudo apt update && sudo apt upgrade -y

# Instale Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Instale Docker Compose
sudo apt install docker-compose -y
```

2. **Clone e configure o projeto**:
```bash
git clone https://github.com/seu-usuario/3dxcubed-website.git
cd 3dxcubed-website

# Configure as variáveis de ambiente
cp .env.example .env.production
nano .env.production
```

3. **Configure o domínio**:
```bash
# Configure o DNS do domínio 3dxcubed.com.br para apontar para o IP da Raspberry Pi
# Configure o certificado SSL (Let's Encrypt recomendado)
```

4. **Execute o deploy**:
```bash
# Build e start dos containers
docker-compose up -d --build

# Verifique os logs
docker-compose logs -f
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` (desenvolvimento) ou `.env.production` (produção):

```env
# Aplicação
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua-chave-secreta-aqui

# Banco de Dados (opcional)
DATABASE_URL=postgresql://usuario:senha@localhost:5432/3dxcubed

# Email (para notificações)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-app

# Pagamentos
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
MERCADOPAGO_ACCESS_TOKEN=APP_USR_...

# Upload de arquivos
MAX_FILE_SIZE=52428800
UPLOAD_DIR=./uploads
```

### SSL/HTTPS

Para configurar HTTPS na Raspberry Pi:

1. **Instale Certbot**:
```bash
sudo apt install certbot python3-certbot-nginx -y
```

2. **Obtenha o certificado**:
```bash
sudo certbot --nginx -d 3dxcubed.com.br -d www.3dxcubed.com.br
```

3. **Configure renovação automática**:
```bash
sudo crontab -e
# Adicione a linha:
0 12 * * * /usr/bin/certbot renew --quiet
```

## 📁 Estrutura do Projeto

```
3dxcubed-website/
├── app/                    # App Router (Next.js 13+)
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   ├── login/             # Páginas de autenticação
│   ├── cadastro/
│   ├── carrinho/
│   ├── impressoes-prontas/
│   ├── impressao-stl/
│   └── modelagem/
├── components/            # Componentes React
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   └── ...
├── contexts/             # Context API
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── lib/                  # Utilitários
├── public/               # Arquivos estáticos
├── types/                # Definições TypeScript
└── utils/                # Funções auxiliares
```

## 🎨 Personalização

### Cores da Marca
As cores estão definidas no `tailwind.config.js`:
- Preto Principal: `#000000`
- Branco Contraste: `#FFFFFF` 
- Roxo Escuro: `#4B0082`

### Logo
Substitua os arquivos de logo na pasta `public/images/logo/`

### Conteúdo
Edite os textos diretamente nos componentes React ou crie um sistema de CMS.

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔒 Segurança

- Headers de segurança configurados no Nginx
- Rate limiting para APIs
- Validação de uploads
- Sanitização de inputs
- HTTPS obrigatório em produção

## 📊 Performance

- Otimização de imagens com Next.js
- Lazy loading de componentes
- Compressão Gzip
- Cache de assets estáticos
- Bundle splitting automático

## 🚀 Deploy

### GitHub Actions (CI/CD)

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Raspberry Pi

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to server
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /path/to/3dxcubed-website
            git pull origin main
            docker-compose up -d --build
```

## 📞 Suporte

Para dúvidas ou suporte:
- Email: 3dxcubed@gmail.com
- Instagram: @3dx.cubed

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📈 Roadmap

- [ ] Sistema de avaliações de produtos
- [ ] Chat em tempo real
- [ ] App mobile (React Native)
- [ ] Integração com redes sociais
- [ ] Sistema de cupons de desconto
- [ ] Relatórios de vendas
- [ ] API pública para integrações

