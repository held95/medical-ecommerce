import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { FaSyringe, FaMask, FaStethoscope, FaBed } from 'react-icons/fa';

const iconMap = {
  'FaSyringe': FaSyringe,
  'FaMask': FaMask,
  'FaStethoscope': FaStethoscope,
  'FaBed': FaBed
};

function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Bem-vindo ao MediShop
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
            Equipamentos e materiais médicos de alta qualidade
          </p>
          <Link to="/products" className="btn btn-secondary" style={{
            padding: '1rem 2rem',
            fontSize: '1.125rem',
            textDecoration: 'none',
            backgroundColor: '#28a745',
            color: 'white',
            borderRadius: '8px',
            display: 'inline-block'
          }}>
            Ver Todos os Produtos
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Categorias</h2>
          <div className="grid grid-4">
            {categories.map(category => {
              const Icon = iconMap[category.icon];
              return (
                <Link
                  key={category.id}
                  to={`/products?category=${category.slug}`}
                  className="card"
                  style={{
                    padding: '2rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  <Icon style={{ fontSize: '3rem', color: category.color, margin: '0 auto 1rem' }} />
                  <h3 style={{ marginBottom: '0.5rem' }}>{category.name}</h3>
                  <p style={{ color: '#6c757d', fontSize: '0.875rem' }}>
                    {category.productCount} produtos
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '3rem 0', backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Produtos em Destaque
          </h2>
          <div className="grid grid-4">
            {featuredProducts.map(product => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="card"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                    {product.name}
                  </h3>
                  <p style={{
                    color: '#007bff',
                    fontSize: '1.25rem',
                    fontWeight: 'bold'
                  }}>
                    R$ {product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/products" className="btn btn-primary" style={{
              padding: '0.75rem 1.5rem',
              textDecoration: 'none',
              display: 'inline-block'
            }}>
              Ver Todos os Produtos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
