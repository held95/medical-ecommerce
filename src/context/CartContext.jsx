import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'mge-benefits-cart';

// Reducer para gerenciar o estado do carrinho
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        // Produto já existe no carrinho, atualiza quantidade
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += quantity;
        return { ...state, items: newItems };
      } else {
        // Adiciona novo produto ao carrinho
        return {
          ...state,
          items: [...state.items, { product, quantity }]
        };
      }
    }

    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload)
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.product.id !== productId)
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      };
    }

    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }

    case 'LOAD_CART': {
      return { ...state, items: action.payload };
    }

    default:
      return state;
  }
};

// Provider do CartContext
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Carrega carrinho do localStorage ao iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  // Salva carrinho no localStorage quando muda
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  // Adicionar produto ao carrinho
  const addToCart = (product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  };

  // Remover produto do carrinho
  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  // Atualizar quantidade
  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  // Limpar carrinho
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Calcular total do carrinho (usando memberPrice)
  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      const price = item.product.memberPrice || item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  // Calcular desconto adicional de membro (5% sobre o total)
  const getMemberDiscount = () => {
    const total = getCartTotal();
    return total * 0.05; // 5% de desconto adicional
  };

  // Calcular economia total (diferença entre oldPrice e memberPrice)
  const getTotalSavings = () => {
    return state.items.reduce((savings, item) => {
      const oldPrice = item.product.oldPrice || item.product.price;
      const memberPrice = item.product.memberPrice || item.product.price;
      return savings + ((oldPrice - memberPrice) * item.quantity);
    }, 0);
  };

  // Calcular total do carrinho com desconto de membro aplicado
  const getCartTotalWithMemberDiscount = () => {
    const total = getCartTotal();
    const discount = getMemberDiscount();
    return total - discount;
  };

  // Contar itens no carrinho
  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getMemberDiscount,
    getTotalSavings,
    getCartTotalWithMemberDiscount,
    getCartCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook customizado para usar o CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};
