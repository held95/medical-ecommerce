import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash, FaMinus, FaPlus, FaTag } from 'react-icons/fa';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const {
    items,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getTotalSavings,
    clearCart
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-empty-container">
        <div className="cart-empty-content">
          <div className="cart-empty-icon">🛒</div>
          <h1 className="cart-empty-title">Carrinho Vazio</h1>
          <p className="cart-empty-text">
            Você ainda não adicionou benefícios ao carrinho.
          </p>
          <Link to="/benefits" className="btn btn-coral btn-lg">
            Explorar Benefícios
          </Link>
        </div>
      </div>
    );
  }

  const shipping = 0; // Free shipping for members
  const subtotal = getCartTotal();
  const savings = getTotalSavings();
  const total = subtotal + shipping;

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1 className="cart-title">Carrinho de Compras</h1>
          <p className="cart-subtitle">{items.length} {items.length === 1 ? 'benefício' : 'benefícios'} no carrinho</p>
        </div>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items-section">
            {items.map(item => {
              const price = item.product.memberPrice || item.product.price;
              const oldPrice = item.product.oldPrice || item.product.price;
              const itemSavings = (oldPrice - price) * item.quantity;

              return (
                <div key={item.product.id} className="cart-item-card">
                  <div className="cart-item-image-wrapper">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="cart-item-image"
                    />
                    {item.product.exclusive && (
                      <span className="cart-item-exclusive-badge">Exclusivo</span>
                    )}
                  </div>

                  <div className="cart-item-details">
                    <Link to={`/benefits/${item.product.id}`} className="cart-item-name-link">
                      <h3 className="cart-item-name">{item.product.name}</h3>
                    </Link>
                    <p className="cart-item-brand">{item.product.brand}</p>

                    <div className="cart-item-pricing">
                      {oldPrice > price && (
                        <span className="cart-item-old-price">
                          R$ {oldPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      )}
                      <span className="cart-item-price">
                        R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    {itemSavings > 0 && (
                      <div className="cart-item-savings">
                        <FaTag />
                        Você economiza R$ {itemSavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    )}
                  </div>

                  <div className="cart-item-quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="cart-qty-btn cart-qty-btn-minus"
                      aria-label="Diminuir quantidade"
                    >
                      <FaMinus />
                    </button>
                    <span className="cart-qty-value">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="cart-qty-btn cart-qty-btn-plus"
                      aria-label="Aumentar quantidade"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <div className="cart-item-subtotal-section">
                    <p className="cart-item-subtotal-label">Subtotal</p>
                    <p className="cart-item-subtotal-value">
                      R$ {(price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="cart-item-remove-btn"
                      aria-label="Remover item"
                    >
                      <FaTrash /> Remover
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="cart-summary-section">
            <div className="cart-summary-card">
              <h3 className="cart-summary-title">Resumo do Pedido</h3>

              {savings > 0 && (
                <div className="cart-summary-savings-highlight">
                  <FaTag className="savings-icon" />
                  <div>
                    <strong>Você está economizando!</strong>
                    <p className="savings-amount">R$ {savings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </div>
                </div>
              )}

              <div className="cart-summary-breakdown">
                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Frete</span>
                  <span className="cart-free-shipping">GRÁTIS</span>
                </div>
                <div className="cart-summary-divider"></div>
                <div className="cart-summary-row cart-summary-total">
                  <span>Total</span>
                  <span>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn btn-coral btn-lg btn-block"
              >
                Finalizar Compra
              </button>

              <button
                onClick={clearCart}
                className="btn btn-outline-navy btn-block"
              >
                Limpar Carrinho
              </button>

              <Link to="/benefits" className="cart-continue-shopping">
                ← Continuar Comprando
              </Link>
            </div>

            <div className="cart-trust-badges">
              <div className="cart-trust-item">
                ✓ Frete Grátis para Membros
              </div>
              <div className="cart-trust-item">
                ✓ Pagamento 100% Seguro
              </div>
              <div className="cart-trust-item">
                ✓ Atendimento Exclusivo
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
