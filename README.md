# 🏥 M&G Benefits Platform

Plataforma de benefícios exclusivos para médicos da M&G, oferecendo descontos de até 30% em tecnologia, viagens, veículos, cursos e muito mais.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/react-19.2.0-61dafb.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🎨 Design

Design inspirado na Norwegian Cruise Line (NCL) com esquema de cores:
- **Navy Blue** (#253746) - Headers e navegação
- **Coral** (#ff9289) - CTAs e destaques
- Interface moderna e responsiva

## ✨ Funcionalidades

### 🔐 Autenticação
- Sistema de login obrigatório para médicos M&G
- Registro com validação de email \`@mgemedicos.com.br\`
- Recuperação de senha
- Role-based access (médico/admin)

### 🎁 Benefícios
- **6 Categorias de Benefícios:**
  - 📱 Tecnologia & Eletrônicos
  - ✈️ Viagens & Experiências
  - 🚗 Veículos & Automotivo
  - 🛡️ Seguros & Proteção
  - 🎓 Cursos & Educação
  - 🎭 Lazer & Entretenimento

- **40+ Produtos** com descontos exclusivos
- Preço especial para membros (5% adicional)
- Badges "Exclusivo" para ofertas limitadas
- Partner logos e validade de ofertas

### 📊 Dashboard do Médico
- Estatísticas de economia total
- Histórico de compras
- Benefícios recomendados
- Quick actions

### 👤 Perfil
- Gerenciamento de dados pessoais
- Histórico completo de pedidos
- Lista de favoritos
- Configurações de notificações

### 🛒 Carrinho
- Cálculo de economia em tempo real
- Destaque de descontos de membro
- Frete grátis para membros
- Summary com total savings

## 🚀 Tecnologias

- **React 19.2.0** - UI Library
- **React Router 7.12.0** - Navegação
- **React Icons 5.5.0** - Ícones
- **Vite 7.2.4** - Build Tool
- **Custom CSS** - Estilização

## 📦 Instalação

\`\`\`bash
# Clone o repositório
git clone https://github.com/held95/medical-ecommerce.git

# Entre no diretório
cd medical-ecommerce

# Instale as dependências
npm install

# Rode em desenvolvimento
npm run dev

# Build para produção
npm run build
\`\`\`

## 🔑 Credenciais de Teste

### Médico
- **Email:** \`dr.silva@mgemedicos.com.br\`
- **Senha:** \`senha123\`

### Admin
- **Email:** \`admin@mgemedicos.com.br\`
- **Senha:** \`admin123\`

## 📁 Estrutura do Projeto

\`\`\`
src/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.jsx      # Proteção de rotas
│   ├── layout/
│   │   ├── Header.jsx              # Cabeçalho com auth
│   │   └── Footer.jsx              # Rodapé M&G
│   └── ui/
│       └── CountdownTimer.jsx      # Timer de ofertas
├── context/
│   ├── AuthContext.jsx             # Gerenciamento de auth
│   ├── CartContext.jsx             # Carrinho + descontos
│   └── ProductContext.jsx          # Produtos + benefícios
├── data/
│   ├── categories.js               # 6 categorias
│   └── products.js                 # 40 produtos mix
├── pages/
│   ├── auth/
│   │   ├── Login.jsx               # Página de login
│   │   ├── Register.jsx            # Cadastro
│   │   └── ForgotPassword.jsx      # Recuperação
│   ├── Home.jsx                    # Landing page
│   ├── Products.jsx                # Lista de benefícios
│   ├── Dashboard.jsx               # Painel do médico
│   ├── Profile.jsx                 # Perfil do usuário
│   └── Cart.jsx                    # Carrinho
└── styles.css                      # Design system global
\`\`\`

## 🎯 Funcionalidades Principais

### Sistema de Descontos
\`\`\`javascript
// Preço regular
oldPrice: 8999.00

// Preço com desconto
price: 7499.00

// Preço para membros (5% adicional)
memberPrice: 7124.05

// Economia total
savings: 1875.00
\`\`\`

### Filtros e Ordenação
- Filtrar por categoria
- Filtrar apenas exclusivos
- Ordenar por nome, preço, desconto, avaliação

### Proteção de Rotas
- \`/benefits\` - Requer autenticação
- \`/dashboard\` - Requer autenticação
- \`/profile\` - Requer autenticação
- \`/admin\` - Requer role admin

## 🌐 Deploy

### GitHub Pages
\`\`\`bash
npm run build
# Deploy a pasta dist/
\`\`\`

### Vercel
\`\`\`bash
vercel --prod
\`\`\`

### Netlify
\`\`\`bash
npm run build
netlify deploy --prod --dir=dist
\`\`\`

## 🔄 Próximos Passos

- [ ] Integração com backend real
- [ ] Autenticação JWT
- [ ] Gateway de pagamento
- [ ] Sistema de favoritos funcional
- [ ] Notificações por email
- [ ] PWA para mobile
- [ ] Testes automatizados

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Desenvolvido por

**Helder** - Transformado com assistência de Claude Sonnet 4.5

---

**M&G Benefits Platform** - Benefícios exclusivos para médicos 🏥✨
