#!/bin/bash
# Script para fazer push para o GitHub
# Substitua SEU-USUARIO pelo seu username do GitHub

# Exemplo de URL: https://github.com/SEU-USUARIO/medical-ecommerce.git

read -p "Digite a URL do repositório GitHub: " REPO_URL

echo "Conectando ao repositório..."
git remote add origin $REPO_URL

echo "Fazendo push para o GitHub..."
git push -u origin master

echo "✅ Push concluído!"
echo "Acesse: https://vercel.com para fazer deploy"
