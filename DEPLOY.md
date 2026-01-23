# 🚀 Guia de Deploy - MediShop

## GitHub

### 1. Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. **Nome:** `medical-ecommerce`
3. **Descrição:** "E-commerce de produtos médicos com React.js - 40 produtos, carrinho, checkout e dashboard admin"
4. Marque como **Público**
5. **NÃO** inicialize com README (já temos localmente)
6. Clique em **Create repository**

### 2. Conectar e Fazer Push

Após criar o repositório, copie a URL (exemplo: `https://github.com/seu-usuario/medical-ecommerce.git`) e execute:

```bash
cd c:\Users\helde\Downloads\medical-ecommerce

# Adicionar remote origin
git remote add origin https://github.com/seu-usuario/medical-ecommerce.git

# Push para GitHub
git push -u origin master
```

---

## Vercel (Deploy Automático)

### 1. Conectar com GitHub

1. Acesse: https://vercel.com
2. Faça login com sua conta GitHub
3. Clique em **"Add New Project"**
4. Selecione **"Import Git Repository"**
5. Escolha o repositório `medical-ecommerce`

### 2. Configurações de Build (Automáticas)

A Vercel detectará automaticamente as configurações do Vite:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 3. Deploy

1. Clique em **"Deploy"**
2. Aguarde 1-2 minutos
3. Seu site estará no ar! 🎉

### 4. URL de Produção

Após o deploy, você receberá uma URL como:
```
https://medical-ecommerce-xxxx.vercel.app
```

---

## Configurações do Projeto

### vercel.json

Já criado! Configura:
- Redirecionamento de rotas para SPA (Single Page Application)
- Build com Vite
- Output para pasta `dist`

### Scripts do package.json

```json
{
  "scripts": {
    "dev": "vite",                    // Desenvolvimento local
    "build": "vite build",            // Build de produção
    "preview": "vite preview"         // Preview do build
  }
}
```

---

## Deploy Manual (Alternativo)

Se preferir fazer deploy manual via CLI:

### 1. Instalar Vercel CLI

```bash
npm install -g vercel
```

### 2. Fazer Login

```bash
vercel login
```

### 3. Deploy

```bash
cd c:\Users\helde\Downloads\medical-ecommerce
vercel
```

Siga as instruções no terminal.

---

## Atualizações Futuras

Após configurar, toda vez que você fizer push no GitHub:

```bash
git add .
git commit -m "Atualização: descrição da mudança"
git push
```

A Vercel fará **deploy automático** da nova versão! ✨

---

## Domínio Customizado (Opcional)

1. Acesse o dashboard do seu projeto na Vercel
2. Vá em **Settings** > **Domains**
3. Adicione seu domínio customizado
4. Configure os DNS conforme instruções

---

## Troubleshooting

### Erro de Build

Se o build falhar, verifique:
- Node.js versão >= 18
- Todas as dependências instaladas
- Comandos de build funcionando localmente

### Rotas não funcionam

O `vercel.json` já está configurado para redirecionar todas as rotas para `index.html` (necessário para SPAs).

### Performance

Para melhorar performance:
- Imagens otimizadas
- Lazy loading de componentes
- Code splitting (já configurado pelo Vite)

---

## Variáveis de Ambiente (Futuro)

Quando integrar com backend real, adicione variáveis:

1. Dashboard Vercel > Settings > Environment Variables
2. Adicione:
   - `VITE_API_URL`
   - `VITE_API_KEY`
   - etc.

---

✅ **Status:** Projeto pronto para deploy!
