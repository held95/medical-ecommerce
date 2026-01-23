import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

function Checkout() {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const { createOrder } = useProducts();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    number: '',
    complement: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'credit'
  });

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (items.length === 0 && !orderSuccess) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Criar pedido mockado
    const order = {
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      },
      items: items.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      subtotal: getCartTotal(),
      shipping: 25.00,
      total: getCartTotal() + 25.00,
      paymentMethod: formData.paymentMethod === 'credit' ? 'Cartão de Crédito' :
                     formData.paymentMethod === 'boleto' ? 'Boleto Bancário' : 'PIX',
      address: {
        street: `${formData.street}, ${formData.number}`,
        complement: formData.complement,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode
      }
    };

    const newOrder = createOrder(order);
    setOrderNumber(newOrder.orderNumber);
    setOrderSuccess(true);
    clearCart();
  };

  if (orderSuccess) {
    return (
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem', textAlign: 'center' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <div style={{ fontSize: '4rem', color: '#28a745', marginBottom: '1rem' }}>✓</div>
          <h1 style={{ color: '#28a745', marginBottom: '1rem' }}>Pedido Realizado com Sucesso!</h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
            Número do pedido: <strong>{orderNumber}</strong>
          </p>
          <p style={{ color: '#6c757d', marginBottom: '2rem' }}>
            Enviamos um email de confirmação para {formData.email}
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
            style={{ marginRight: '0.5rem' }}
          >
            Voltar para Início
          </button>
          <button
            onClick={() => navigate('/products')}
            className="btn btn-secondary"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  const shipping = 25.00;
  const total = getCartTotal() + shipping;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Finalizar Compra</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {/* Form */}
        <div>
          <form onSubmit={handleSubmit} style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Dados Pessoais</h2>

            <div className="form-group">
              <label className="form-label">Nome Completo *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Telefone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <h2 style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>Endereço de Entrega</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">CEP *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Rua *</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Número *</label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Complemento</label>
              <input
                type="text"
                name="complement"
                value={formData.complement}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Cidade *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Estado *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="form-control"
                  maxLength="2"
                  required
                />
              </div>
            </div>

            <h2 style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>Forma de Pagamento</h2>

            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit"
                  checked={formData.paymentMethod === 'credit'}
                  onChange={handleChange}
                  style={{ marginRight: '0.5rem' }}
                />
                Cartão de Crédito
              </label>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="boleto"
                  checked={formData.paymentMethod === 'boleto'}
                  onChange={handleChange}
                  style={{ marginRight: '0.5rem' }}
                />
                Boleto Bancário
              </label>
              <label style={{ display: 'block' }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pix"
                  checked={formData.paymentMethod === 'pix'}
                  onChange={handleChange}
                  style={{ marginRight: '0.5rem' }}
                />
                PIX
              </label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
              Finalizar Pedido
            </button>
          </form>
        </div>

        {/* Summary */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          height: 'fit-content'
        }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Resumo do Pedido</h2>

          {items.map(item => (
            <div key={item.product.id} style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #dee2e6'
            }}>
              <img
                src={item.product.image}
                alt={item.product.name}
                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{item.product.name}</p>
                <p style={{ fontSize: '0.875rem', color: '#6c757d' }}>
                  Qtd: {item.quantity} x R$ {item.product.price.toFixed(2)}
                </p>
              </div>
              <div style={{ fontWeight: 'bold' }}>
                R$ {(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          <div style={{ marginTop: '1.5rem' }}>
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
        </div>
      </div>
    </div>
  );
}

export default Checkout;
