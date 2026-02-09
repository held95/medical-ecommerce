import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { categories } from '../data/categories';
import { products } from '../data/products';
import CountdownTimer from '../components/ui/CountdownTimer';
import {
  FaLaptop,
  FaPlane,
  FaCar,
  FaShieldAlt,
  FaGraduationCap,
  FaTheaterMasks,
  FaCheckCircle,
  FaTruck,
  FaHeadset,
  FaCreditCard,
  FaArrowRight,
  FaWhatsapp,
  FaUserPlus,
  FaSearch,
  FaShoppingCart,
  FaStar,
  FaQuoteLeft
} from 'react-icons/fa';
import './Home.css';

const iconMap = {
  'FaLaptop': FaLaptop,
  'FaPlane': FaPlane,
  'FaCar': FaCar,
  'FaShieldAlt': FaShieldAlt,
  'FaGraduationCap': FaGraduationCap,
  'FaTheaterMasks': FaTheaterMasks
};

// Partners logos (using clearbit for demo)
const partners = [
  { name: 'Apple', logo: 'https://logo.clearbit.com/apple.com' },
  { name: 'Samsung', logo: 'https://logo.clearbit.com/samsung.com' },
  { name: 'Toyota', logo: 'https://logo.clearbit.com/toyota.com' },
  { name: 'Porto Seguro', logo: 'https://logo.clearbit.com/portoseguro.com.br' },
  { name: 'CVC', logo: 'https://logo.clearbit.com/cvc.com.br' },
  { name: 'FGV', logo: 'https://logo.clearbit.com/fgv.br' },
  { name: 'Netflix', logo: 'https://logo.clearbit.com/netflix.com' },
  { name: 'Spotify', logo: 'https://logo.clearbit.com/spotify.com' }
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: 'Dr. João Silva',
    specialty: 'Cardiologista',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    text: 'Economia incrível! Consegui desconto de 25% em um MacBook Pro. A plataforma é excelente e o atendimento impecável.'
  },
  {
    id: 2,
    name: 'Dra. Maria Santos',
    specialty: 'Pediatra',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    text: 'Fiz um cruzeiro com minha família com 30% de desconto. Ser membro M&G tem vantagens reais!'
  },
  {
    id: 3,
    name: 'Dr. Carlos Mendes',
    specialty: 'Ortopedista',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    rating: 5,
    text: 'Além dos descontos em produtos, consegui fazer um MBA com preço especial. Recomendo muito!'
  }
];

function Home() {
  const { isAuthenticated } = useAuth();
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content animate-fade-in-up">
            <div className="hero-badge">
              <FaCheckCircle /> Exclusivo para Médicos M&G
            </div>
            <h1 className="hero-title">
              Benefícios Exclusivos para <span className="text-coral">Médicos M&G</span>
            </h1>
            <p className="hero-subtitle">
              Aproveite descontos de até 30% em tecnologia, viagens, veículos, cursos e muito mais.
              Benefícios pensados especialmente para você.
            </p>

            {/* Countdown Timer */}
            <CountdownTimer
              targetDate={new Date('2026-06-30T23:59:59')}
              label="Ofertas especiais válidas até:"
            />

            <div className="hero-actions">
              {!isAuthenticated ? (
                <>
                  <Link to="/register" className="btn-hero-primary">
                    Criar Conta Grátis
                    <FaArrowRight />
                  </Link>
                  <Link to="/benefits" className="btn-hero-secondary">
                    Explorar Benefícios
                  </Link>
                </>
              ) : (
                <Link to="/benefits" className="btn-hero-primary">
                  Ver Todos os Benefícios
                  <FaArrowRight />
                </Link>
              )}
            </div>

            {/* Trust Badges */}
            <div className="hero-trust-badges">
              <div className="trust-badge">
                <FaTruck />
                <span>Entrega em Todo Brasil</span>
              </div>
              <div className="trust-badge">
                <FaHeadset />
                <span>Atendimento Exclusivo</span>
              </div>
              <div className="trust-badge">
                <FaCreditCard />
                <span>Pagamento Seguro</span>
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
              <div className="stat-label">Médicos Beneficiados</div>
            </div>
            <div className="stat-card animate-fade-in-up animate-delay-100">
              <div className="stat-number">R$ 2.5M+</div>
              <div className="stat-label">em Economia Total</div>
            </div>
            <div className="stat-card animate-fade-in-up animate-delay-200">
              <div className="stat-number">100+</div>
              <div className="stat-label">Parceiros Premium</div>
            </div>
            <div className="stat-card animate-fade-in-up animate-delay-300">
              <div className="stat-number">98%</div>
              <div className="stat-label">de Satisfação</div>
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
              Benefícios exclusivos em diversas categorias pensadas para você
            </p>
          </div>
          <div className="categories-grid">
            {categories.map(category => {
              const Icon = iconMap[category.icon];
              return (
                <Link
                  key={category.id}
                  to={`/benefits?category=${category.slug}`}
                  className="category-card hover-lift"
                >
                  <div className="category-icon" style={{ backgroundColor: category.color + '20', color: category.color }}>
                    {Icon && <Icon />}
                  </div>
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-description">{category.description}</p>
                  <div className="category-count">{category.productCount} benefícios</div>
                  <div className="category-arrow">
                    <FaArrowRight />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Benefits */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Benefícios em Destaque</h2>
            <p className="section-subtitle">
              Seleção especial dos melhores benefícios para você
            </p>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => {
              const savings = product.oldPrice ? (product.oldPrice - product.memberPrice) : 0;
              return (
                <Link
                  key={product.id}
                  to={`/benefits/${product.id}`}
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
                    {product.exclusive && (
                      <span className="product-badge-exclusive">Exclusivo</span>
                    )}
                    {product.partnerLogo && (
                      <img
                        src={product.partnerLogo}
                        alt={product.brand}
                        className="partner-logo-small"
                      />
                    )}
                  </div>
                  <div className="product-card-content">
                    <span className="product-brand">{product.brand}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-prices">
                      {product.oldPrice && (
                        <span className="price-old">R$ {product.oldPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      )}
                      <span className="price-member">R$ {product.memberPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    {savings > 0 && (
                      <div className="savings-badge">
                        Economia: R$ {savings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    )}
                    <div className="product-action">
                      <span>Ver Detalhes</span>
                      <FaArrowRight />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="section-cta">
            <Link to="/benefits" className="btn btn-primary btn-lg">
              Ver Todos os Benefícios
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Como Funciona</h2>
            <p className="section-subtitle">
              Simples, rápido e seguro. Aproveite seus benefícios em 3 passos
            </p>
          </div>
          <div className="steps-grid">
            <div className="step-card animate-fade-in-up">
              <div className="step-number">1</div>
              <div className="step-icon">
                <FaUserPlus />
              </div>
              <h3 className="step-title">Cadastre-se</h3>
              <p className="step-description">
                Crie sua conta gratuitamente com seu email @mgemedicos.com.br
              </p>
            </div>
            <div className="step-card animate-fade-in-up animate-delay-100">
              <div className="step-number">2</div>
              <div className="step-icon">
                <FaSearch />
              </div>
              <h3 className="step-title">Escolha Benefícios</h3>
              <p className="step-description">
                Navegue por centenas de ofertas exclusivas em diversas categorias
              </p>
            </div>
            <div className="step-card animate-fade-in-up animate-delay-200">
              <div className="step-number">3</div>
              <div className="step-icon">
                <FaShoppingCart />
              </div>
              <h3 className="step-title">Economize</h3>
              <p className="step-description">
                Aproveite descontos de até 30% e benefícios exclusivos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nossos Parceiros</h2>
            <p className="section-subtitle">
              Trabalhamos com as melhores marcas do mercado
            </p>
          </div>
          <div className="partners-grid">
            {partners.map((partner, index) => (
              <div key={index} className="partner-logo-wrapper">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="partner-logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">O Que Médicos Dizem</h2>
            <p className="section-subtitle">
              Experiências reais de quem já aproveitou nossos benefícios
            </p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card animate-fade-in-up">
                <div className="testimonial-quote-icon">
                  <FaQuoteLeft />
                </div>
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="testimonial-avatar"
                  />
                  <div className="testimonial-info">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.specialty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-title">Pronto para Economizar?</h2>
              <p className="cta-subtitle">
                Junte-se a milhares de médicos que já economizam com a M&G
              </p>
              <div className="cta-actions">
                <Link to="/register" className="btn btn-coral btn-lg">
                  Criar Conta Grátis
                  <FaArrowRight />
                </Link>
                <a
                  href="https://wa.me/5516999999999"
                  className="btn btn-outline-white btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp /> Falar com Consultor
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
