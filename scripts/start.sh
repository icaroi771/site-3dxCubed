#!/bin/bash

# Script de inicialização para desenvolvimento
# 3dxCubed Website

echo "🚀 Iniciando projeto 3dxCubed..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale Node.js 18+ primeiro."
    exit 1
fi

# Verificar versão do Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js versão 18+ é necessária. Versão atual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) encontrado"

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado."
    exit 1
fi

echo "✅ npm $(npm -v) encontrado"

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Erro ao instalar dependências"
        exit 1
    fi
    echo "✅ Dependências instaladas"
else
    echo "✅ Dependências já instaladas"
fi

# Criar arquivo .env.local se não existir
if [ ! -f ".env.local" ]; then
    echo "⚙️ Criando arquivo de ambiente..."
    cp env.example .env.local
    echo "✅ Arquivo .env.local criado"
    echo "⚠️ Configure as variáveis de ambiente no arquivo .env.local"
fi

# Criar diretórios necessários
echo "📁 Criando diretórios..."
mkdir -p uploads
mkdir -p public/images
mkdir -p public/images/products
mkdir -p public/images/logo

echo "✅ Diretórios criados"

# Verificar se o projeto compila
echo "🔨 Verificando compilação..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erro na compilação"
    exit 1
fi

echo "✅ Projeto compilado com sucesso"

# Iniciar servidor de desenvolvimento
echo "🌐 Iniciando servidor de desenvolvimento..."
echo "📍 Acesse: http://localhost:3000"
echo "🛑 Para parar: Ctrl+C"
echo ""

npm run dev

