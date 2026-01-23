import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();

  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container" style={{ paddingTop: '2rem', textAlign: 'center' }}>
        <h2>Produto não encontrado</h2>
        <Link to="/products" className="btn btn-primary" style={{
          marginTop: '1rem',
          display: 'inline-block',
          textDecoration: 'none'
        }}>
          Voltar para Produtos
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity}x ${product.name} adicionado(s) ao carrinho!`);
    navigate('/cart');
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <Link to="/products" style={{ marginBottom: '1rem', display: 'inline-block' }}>
        ← Voltar para Produtos
      </Link>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '2rem'
      }}>
        {/* Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        {/* Info */}
        <div>
          <h1 style={{ marginBottom: '1rem' }}>{product.name}</h1>
          <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
            Marca: <strong>{product.brand}</strong> | SKU: {product.sku}
          </p>

          <div style={{
            fontSize: '2rem',
            color: '#007bff',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            R$ {product.price.toFixed(2)}
          </div>

          {product.oldPrice && (
            <p style={{ color: '#6c757d', textDecoration: 'line-through' }}>
              De: R$ {product.oldPrice.toFixed(2)}
            </p>
          )}

          <p style={{ marginBottom: '1rem' }}>{product.description}</p>

          {product.longDescription && (
            <p style={{ marginBottom: '1.5rem', color: '#6c757d' }}>
              {product.longDescription}
            </p>
          )}

          {product.features && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Características:</h3>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '1.5rem'
          }}>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>Disponibilidade:</strong>{' '}
              {product.stock > 0 ? (
                <span style={{ color: '#28a745' }}>Em estoque ({product.stock} unidades)</span>
              ) : (
                <span style={{ color: '#dc3545' }}>Esgotado</span>
              )}
            </p>
            {product.rating && (
              <p>
                <strong>Avaliação:</strong> ⭐ {product.rating}/5 ({product.reviewCount} avaliações)
              </p>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Quantidade:
              </label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                style={{
                  padding: '0.625rem',
                  borderRadius: '4px',
                  border: '1px solid #ced4da',
                  width: '100px'
                }}
              />
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.125rem',
              backgroundColor: product.stock === 0 ? '#6c757d' : '#007bff'
            }}
          >
            {product.stock === 0 ? 'Produto Esgotado' : 'Adicionar ao Carrinho'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
