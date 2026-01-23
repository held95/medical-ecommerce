import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { categories } from '../data/categories';

function Products() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const { filterProducts } = useProducts();
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [sortBy, setSortBy] = useState('name');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = filterProducts({
      category: selectedCategory !== 'all' ? selectedCategory : null,
      sortBy
    });
    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, filterProducts]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    alert(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Produtos</h1>

      {/* Filters */}
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Categoria:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '0.625rem',
                borderRadius: '4px',
                border: '1px solid #ced4da'
              }}
            >
              <option value="all">Todas as Categorias</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Ordenar por:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                width: '100%',
                padding: '0.625rem',
                borderRadius: '4px',
                border: '1px solid #ced4da'
              }}
            >
              <option value="name">Nome (A-Z)</option>
              <option value="price-asc">Preço (Menor)</option>
              <option value="price-desc">Preço (Maior)</option>
              <option value="rating">Avaliação</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ color: '#6c757d' }}>
          {filteredProducts.length} produto(s) encontrado(s)
        </p>
      </div>

      <div className="grid grid-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="card">
            <Link to={`/products/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
            </Link>
            <div className="card-body">
              <Link
                to={`/products/${product.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <h3 style={{
                  fontSize: '1rem',
                  marginBottom: '0.5rem',
                  height: '2.4em',
                  overflow: 'hidden'
                }}>
                  {product.name}
                </h3>
              </Link>
              <p style={{ fontSize: '0.875rem', color: '#6c757d', marginBottom: '0.5rem' }}>
                {product.brand}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <span style={{
                  color: '#007bff',
                  fontSize: '1.25rem',
                  fontWeight: 'bold'
                }}>
                  R$ {product.price.toFixed(2)}
                </span>
                {product.stock > 0 ? (
                  <span style={{
                    color: '#28a745',
                    fontSize: '0.75rem'
                  }}>
                    Em estoque
                  </span>
                ) : (
                  <span style={{
                    color: '#dc3545',
                    fontSize: '0.75rem'
                  }}>
                    Esgotado
                  </span>
                )}
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  backgroundColor: product.stock === 0 ? '#6c757d' : '#007bff'
                }}
              >
                {product.stock === 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6c757d' }}>
          <p style={{ fontSize: '1.25rem' }}>Nenhum produto encontrado.</p>
        </div>
      )}
    </div>
  );
}

export default Products;
