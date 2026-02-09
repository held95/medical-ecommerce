import { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';
import { orders as initialOrders } from '../data/orders';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [loading, setLoading] = useState(false);

  // Buscar todos os produtos
  const getProducts = () => {
    return products;
  };

  // Buscar produto por ID
  const getProductById = (id) => {
    return products.find(p => p.id === parseInt(id));
  };

  // Buscar produtos por categoria
  const getProductsByCategory = (category) => {
    return products.filter(p => p.category === category);
  };

  // Buscar produtos (query de busca)
  const searchProducts = (query) => {
    if (!query || query.trim() === '') {
      return products;
    }
    const lowerQuery = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery)
    );
  };

  // Filtrar produtos por múltiplos critérios
  const filterProducts = ({ category, priceRange, brand, sortBy }) => {
    let filtered = [...products];

    // Filtro por categoria
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    // Filtro por faixa de preço
    if (priceRange) {
      const [min, max] = priceRange;
      filtered = filtered.filter(p => p.price >= min && p.price <= max);
    }

    // Filtro por marca
    if (brand && brand !== 'all') {
      filtered = filtered.filter(p => p.brand === brand);
    }

    // Ordenação
    if (sortBy) {
      switch (sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.memberPrice - b.memberPrice);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.memberPrice - a.memberPrice);
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'rating':
          filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case 'discount-desc':
          filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
          break;
        default:
          break;
      }
    }

    return filtered;
  };

  // Buscar benefícios exclusivos
  const getExclusiveBenefits = () => {
    return products.filter(p => p.exclusive === true);
  };

  // Buscar benefícios válidos (não expirados)
  const getValidBenefits = () => {
    const today = new Date().toISOString().split('T')[0];
    return products.filter(p => !p.validUntil || p.validUntil >= today);
  };

  // Buscar benefícios por parceiro
  const getBenefitsByPartner = (partnerName) => {
    if (!partnerName) return products;
    const lowerPartner = partnerName.toLowerCase();
    return products.filter(p =>
      p.brand.toLowerCase().includes(lowerPartner)
    );
  };

  // Adicionar novo produto (Admin)
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Math.max(...products.map(p => p.id)) + 1,
      rating: 0,
      reviewCount: 0
    };
    setProducts([...products, newProduct]);
    return newProduct;
  };

  // Atualizar produto (Admin)
  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, ...updatedProduct } : p
    ));
  };

  // Deletar produto (Admin)
  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Buscar pedidos
  const getOrders = () => {
    return orders;
  };

  // Buscar pedido por ID
  const getOrderById = (id) => {
    return orders.find(o => o.id === parseInt(id));
  };

  // Buscar pedidos por status
  const getOrdersByStatus = (status) => {
    return orders.filter(o => o.status === status);
  };

  // Atualizar status do pedido (Admin)
  const updateOrderStatus = (id, status) => {
    setOrders(orders.map(o =>
      o.id === id ? { ...o, status } : o
    ));
  };

  // Criar novo pedido
  const createOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: Math.max(...orders.map(o => o.id)) + 1,
      orderNumber: `PED-2026-${String(orders.length + 1).padStart(4, '0')}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pendente'
    };
    setOrders([...orders, newOrder]);
    return newOrder;
  };

  // Estatísticas do dashboard
  const getStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const ordersToday = orders.filter(o => o.date === today);
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const pendingOrders = orders.filter(o => o.status === 'pendente');

    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      ordersToday: ordersToday.length,
      totalRevenue,
      pendingCount: pendingOrders.length,
      lowStockCount: products.filter(p => p.stock < 50).length
    };
  };

  const value = {
    products,
    loading,
    getProducts,
    getProductById,
    getProductsByCategory,
    searchProducts,
    filterProducts,
    getExclusiveBenefits,
    getValidBenefits,
    getBenefitsByPartner,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    getOrders,
    getOrderById,
    getOrdersByStatus,
    updateOrderStatus,
    createOrder,
    getStats
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook customizado para usar o ProductContext
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts deve ser usado dentro de um ProductProvider');
  }
  return context;
};
