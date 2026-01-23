# 🏥 MediShop - E-commerce de Produtos Médicos

E-commerce completo desenvolvido em React.js com dados mockados para venda de produtos médicos.

## 🚀 Tecnologias

- React.js 18+ | React Router v6 | Context API | React Icons | Vite | CSS3

## ✨ Funcionalidades

**Frontend:**
- Catálogo com 40 produtos em 4 categorias
- Filtros e ordenação
- Carrinho com localStorage
- Checkout completo
- Confirmação de pedido

**Admin:**
- Dashboard com estatísticas
- Visualização de pedidos

## 📦 Categorias (40 produtos)

1. Equipamentos Cirúrgicos (10)
2. Materiais Descartáveis (15)
3. Equipamentos de Diagnóstico (8)
4. Mobiliário Médico (7)

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Iniciar servidor
npm run dev

# Acessar
http://localhost:5173
```

## 📁 Estrutura

```
src/
├── components/layout/     # Header, Footer
├── context/               # CartContext, ProductContext
├── data/                  # Dados mockados
├── pages/                 # Home, Products, Cart, Checkout, Admin
└── App.jsx                # Rotas principais
```

## 🎨 Cores

- Primária: #007bff (Azul médico)
- Secundária: #28a745 (Verde)
- Perigo: #dc3545 (Vermelho)

## 📱 Responsivo

Mobile (< 768px) | Tablet (768-1024px) | Desktop (> 1024px)

## 💾 Persistência

Carrinho salvo automaticamente no localStorage

## 🔮 Futuras Implementações

- Backend real
- Autenticação
- Gateway de pagamento
- CRUD completo admin
- Sistema de avaliações
- Busca avançada

---

**Status:** ✅ Funcionando em http://localhost:5173
