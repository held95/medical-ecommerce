import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

function Cart() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '1rem' }}>Carrinho Vazio</h1>
        <p style={{ color: '#6c757d', marginBottom: '2rem' }}>
          Você ainda não adicionou produtos ao carrinho.
        </p>
        <Link to="/products" className="btn btn-primary" style={{
          textDecoration: 'none',
          display: 'inline-block'
        }}>
          Continuar Comprando
        </Link>
      </div>
    );
  }

  const shipping = 25.00;
  const total = getCartTotal() + shipping;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Carrinho de Compras</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {/* Cart Items */}
        <div style={{ gridColumn: '1 / -1' }}>
          {items.map(item => (
            <div key={item.product.id} style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center'
            }}>
              <img
                src={item.product.image}
                alt={item.product.name}
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
              />

              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '0.5rem' }}>{item.product.name}</h3>
                <p style={{ color: '#6c757d', fontSize: '0.875rem' }}>
                  {item.product.brand}
                </p>
                <p style={{ color: '#007bff', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
                  R$ {item.product.price.toFixed(2)}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="btn btn-sm"
                  style={{ padding: '0.5rem', backgroundColor: '#6c757d', color: 'white' }}
                >
                  <FaMinus />
                </button>
                <span style={{ minWidth: '40px', textAlign: 'center', fontWeight: 'bold' }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="btn btn-sm"
                  style={{ padding: '0.5rem', backgroundColor: '#007bff', color: 'white' }}
                >
                  <FaPlus />
                </button>
              </div>

              <div style={{ textAlign: 'right', minWidth: '100px' }}>
                <p style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="btn btn-danger btn-sm"
                  style={{
                    padding: '0.375rem 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <FaTrash /> Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          height: 'fit-content',
          gridColumn: '1 / -1',
          maxWidth: '400px',
          marginLeft: 'auto'
        }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Resumo do Pedido</h3>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Subtotal:</span>
              <span>R$ {getCartTotal().toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Frete:</span>
              <span>R$ {shipping.toFixed(2)}</span>
            </div>
            <hr style={{ margin: '1rem 0' }} />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#007bff'
            }}>
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: '0.5rem' }}
          >
            Finalizar Compra
          </button>

          <button
            onClick={clearCart}
            className="btn btn-danger"
            style={{ width: '100%' }}
          >
            Limpar Carrinho
          </button>

          <Link to="/products" style={{
            display: 'block',
            textAlign: 'center',
            marginTop: '1rem',
            color: '#007bff'
          }}>
            Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
