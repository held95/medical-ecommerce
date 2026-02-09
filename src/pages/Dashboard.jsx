import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';
import { FaDollarSign, FaShoppingBag, FaHeart, FaTrophy, FaArrowRight, FaStar } from 'react-icons/fa';
import './Dashboard.css';

function Dashboard() {
  const { currentUser } = useAuth();

  // Mock data - in real app would come from API
  const stats = {
    totalSavings: currentUser?.benefits?.totalSavings || 15420.50,
    purchasesCount: currentUser?.benefits?.purchasesCount || 8,
    favoritesCount: 12,
    memberLevel: 'Gold'
  };

  // Mock recent purchases
  const recentPurchases = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max 256GB',
      date: '2026-02-05',
      amount: 7124.05,
      savings: 1875.00,
      status: 'Entregue'
    },
    {
      id: 2,
      name: 'Cruzeiro Caribe 7 Noites',
      date: '2026-01-28',
      amount: 4740.50,
      savings: 1759.50,
      status: 'Confirmado'
    },
    {
      id: 3,
      name: 'MacBook Air M3',
      date: '2026-01-15',
      amount: 6649.00,
      savings: 1851.00,
      status: 'Entregue'
    }
  ];

  // Recommended products
  const recommendedProducts = products.slice(0, 4);

  return (
    <div className="dashboard-page">
      <div className="container">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div className="dashboard-welcome">
            <h1 className="dashboard-title">Bem-vindo, {currentUser?.name?.split(' ')[0]}</h1>
            <p className="dashboard-subtitle">
              Sua economia total: <strong className="text-coral">
                R$ {stats.totalSavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </strong>
            </p>
          </div>
          <Link to="/profile" className="btn btn-outline-navy">
            Ver Perfil
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="stats-dashboard-grid">
          <div className="stat-dashboard-card stat-coral">
            <div className="stat-dashboard-icon">
              <FaDollarSign />
            </div>
            <div className="stat-dashboard-content">
              <div className="stat-dashboard-value">
                R$ {stats.totalSavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="stat-dashboard-label">Economia Total</div>
            </div>
          </div>

          <div className="stat-dashboard-card stat-navy">
            <div className="stat-dashboard-icon">
              <FaShoppingBag />
            </div>
            <div className="stat-dashboard-content">
              <div className="stat-dashboard-value">{stats.purchasesCount}</div>
              <div className="stat-dashboard-label">Benefícios Utilizados</div>
            </div>
          </div>

          <div className="stat-dashboard-card stat-coral">
            <div className="stat-dashboard-icon">
              <FaHeart />
            </div>
            <div className="stat-dashboard-content">
              <div className="stat-dashboard-value">{stats.favoritesCount}</div>
              <div className="stat-dashboard-label">Favoritos</div>
            </div>
          </div>

          <div className="stat-dashboard-card stat-gold">
            <div className="stat-dashboard-icon">
              <FaTrophy />
            </div>
            <div className="stat-dashboard-content">
              <div className="stat-dashboard-value">{stats.memberLevel}</div>
              <div className="stat-dashboard-label">Nível do Membro</div>
            </div>
          </div>
        </div>

        {/* Recent Purchases Section */}
        <section className="dashboard-section">
          <div className="section-header-dashboard">
            <h2 className="section-title-dashboard">Compras Recentes</h2>
            <Link to="/profile?tab=historico" className="section-link">
              Ver Todas <FaArrowRight />
            </Link>
          </div>

          <div className="purchases-table-container">
            <table className="purchases-table">
              <thead>
                <tr>
                  <th>Benefício</th>
                  <th>Data</th>
                  <th>Valor Pago</th>
                  <th>Economia</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPurchases.map((purchase) => (
                  <tr key={purchase.id}>
                    <td className="purchase-name">{purchase.name}</td>
                    <td className="purchase-date">
                      {new Date(purchase.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="purchase-amount">
                      R$ {purchase.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="purchase-savings">
                      R$ {purchase.savings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td>
                      <span className={`status-badge status-${purchase.status.toLowerCase()}`}>
                        {purchase.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recommended Benefits Section */}
        <section className="dashboard-section">
          <div className="section-header-dashboard">
            <h2 className="section-title-dashboard">Recomendados Para Você</h2>
            <Link to="/benefits" className="section-link">
              Ver Todos <FaArrowRight />
            </Link>
          </div>

          <div className="recommended-grid">
            {recommendedProducts.map((product) => {
              const savings = product.oldPrice ? (product.oldPrice - product.memberPrice) : 0;

              return (
                <Link
                  key={product.id}
                  to={`/benefits/${product.id}`}
                  className="recommended-card"
                >
                  <div className="recommended-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="recommended-image"
                    />
                    {product.discount > 0 && (
                      <span className="recommended-badge">-{product.discount}%</span>
                    )}
                  </div>
                  <div className="recommended-content">
                    <span className="recommended-brand">{product.brand}</span>
                    <h3 className="recommended-name">{product.name}</h3>
                    <div className="recommended-rating">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < product.rating ? 'star-filled' : 'star-empty'}
                        />
                      ))}
                      <span className="rating-count">({product.reviewCount})</span>
                    </div>
                    <div className="recommended-prices">
                      {product.oldPrice && (
                        <span className="recommended-old-price">
                          R$ {product.oldPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      )}
                      <span className="recommended-price">
                        R$ {product.memberPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    {savings > 0 && (
                      <div className="recommended-savings">
                        Economia: R$ {savings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="dashboard-section">
          <h2 className="section-title-dashboard">Acesso Rápido</h2>
          <div className="quick-actions-grid">
            <Link to="/benefits" className="quick-action-card">
              <FaShoppingBag className="quick-action-icon" />
              <span>Explorar Benefícios</span>
            </Link>
            <Link to="/profile?tab=favoritos" className="quick-action-card">
              <FaHeart className="quick-action-icon" />
              <span>Meus Favoritos</span>
            </Link>
            <Link to="/profile?tab=historico" className="quick-action-card">
              <FaShoppingBag className="quick-action-icon" />
              <span>Histórico de Compras</span>
            </Link>
            <Link to="/profile" className="quick-action-card">
              <FaTrophy className="quick-action-icon" />
              <span>Meu Perfil</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
