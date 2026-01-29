import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { FaSyringe, FaMask, FaStethoscope, FaBed, FaCheckCircle, FaTruck, FaHeadset, FaShieldAlt, FaArrowRight, FaWhatsapp } from 'react-icons/fa';
import './Home.css';

const iconMap = {
  'FaSyringe': FaSyringe,
  'FaMask': FaMask,
  'FaStethoscope': FaStethoscope,
  'FaBed': FaBed
};

function Home() {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="home-page">
      {/* Hero Section Premium */}
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content animate-fade-in-up">
            <div className="hero-badge">
              <FaCheckCircle /> Certificado ANVISA
            </div>
            <h1 className="hero-title">
              Equipamentos Médicos de <span className="text-gradient">Alta Performance</span>
            </h1>
            <p className="hero-subtitle">
              Soluções completas para profissionais da saúde. Tecnologia de ponta,
              atendimento especializado e entrega em todo Brasil.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn-hero-primary">
                Ver Catálogo Completo
                <FaArrowRight />
              </Link>
              <a href="https://wa.me/5516999999999" className="btn-hero-secondary" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp /> Fale com Especialista
              </a>
            </div>

            {/* Trust Badges */}
            <div className="hero-trust-badges">
              <div className="trust-badge">
                <FaTruck />
                <span>Frete Grátis Sul/Sudeste</span>
              </div>
              <div className="trust-badge">
                <FaHeadset />
                <span>Suporte 24/7</span>
              </div>
              <div className="trust-badge">
                <FaShieldAlt />
                <span>Garantia Estendida</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card animate-fade-in-up">
              <div className="stat-number">5.000+</div>
              <div className="stat-label">Profissionais Atendidos</div>
            </div>
            <div className="stat-card animate-fade-in-up animate-delay-100">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfação dos Clientes</div>
            </div>
            <div className="stat-card animate-fade-in-up animate-delay-200">
              <div className="stat-number">15 Anos</div>
              <div className="stat-label">No Mercado Médico</div>
            </div>
            <div className="stat-card animate-fade-in-up animate-delay-300">
              <div className="stat-number">24h</div>
              <div className="stat-label">Entrega Expressa*</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Explore por Categoria</h2>
            <p className="section-subtitle">
              Encontre os melhores equipamentos organizados por especialidade
            </p>
          </div>
          <div className="categories-grid">
            {categories.map(category => {
              const Icon = iconMap[category.icon];
              return (
                <Link
                  key={category.id}
                  to={`/products?category=${category.slug}`}
                  className="category-card hover-lift"
                >
                  <div className="category-icon" style={{ backgroundColor: category.color + '20', color: category.color }}>
                    <Icon />
                  </div>
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-count">{category.productCount} produtos</p>
                  <div className="category-arrow">
                    <FaArrowRight />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Produtos em Destaque</h2>
            <p className="section-subtitle">
              Seleção especial dos nossos produtos mais populares
            </p>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="product-card-home hover-lift"
              >
                <div className="product-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  {product.discount > 0 && (
                    <span className="product-badge-discount">-{product.discount}%</span>
                  )}
                </div>
                <div className="product-card-content">
                  <span className="product-brand">{product.brand}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-prices">
                    {product.oldPrice && (
                      <span className="price-old">R$ {product.oldPrice.toFixed(2)}</span>
                    )}
                    <span className="price-current">R$ {product.price.toFixed(2)}</span>
                  </div>
                  <div className="product-action">
                    <span>Ver Detalhes</span>
                    <FaArrowRight />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/products" className="btn btn-primary btn-lg">
              Ver Todos os Produtos
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
