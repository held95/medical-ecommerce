import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import {
  FaUser,
  FaEnvelope,
  FaIdCard,
  FaPhone,
  FaSave,
  FaShoppingBag,
  FaHeart,
  FaCog,
  FaStar,
  FaTimes
} from 'react-icons/fa';
import './Profile.css';

function Profile() {
  const { currentUser, updateProfile } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') || 'dados';

  const [activeTab, setActiveTab] = useState(tabParam);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    crm: currentUser?.crm || '',
    specialty: currentUser?.specialty || '',
    phone: currentUser?.phone || ''
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    alert('Perfil atualizado com sucesso!');
  };

  // Mock data
  const purchaseHistory = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max 256GB',
      date: '2026-02-05',
      amount: 7124.05,
      savings: 1875.00,
      status: 'Entregue',
      image: 'https://images.unsplash.com/photo-1678652197950-ecb9b84b3ff8?w=200'
    },
    {
      id: 2,
      name: 'Cruzeiro Caribe 7 Noites',
      date: '2026-01-28',
      amount: 4740.50,
      savings: 1759.50,
      status: 'Confirmado',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200'
    },
    {
      id: 3,
      name: 'MacBook Air M3',
      date: '2026-01-15',
      amount: 6649.00,
      savings: 1851.00,
      status: 'Entregue',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200'
    }
  ];

  const favorites = products.slice(0, 6);

  return (
    <div className="profile-page">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <FaUser />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{currentUser?.name}</h1>
            <p className="profile-email">{currentUser?.email}</p>
            <span className="profile-badge">Membro {currentUser?.role === 'admin' ? 'Admin' : 'Gold'}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button
            className={`profile-tab ${activeTab === 'dados' ? 'active' : ''}`}
            onClick={() => handleTabChange('dados')}
          >
            <FaUser /> Meus Dados
          </button>
          <button
            className={`profile-tab ${activeTab === 'historico' ? 'active' : ''}`}
            onClick={() => handleTabChange('historico')}
          >
            <FaShoppingBag /> Histórico
          </button>
          <button
            className={`profile-tab ${activeTab === 'favoritos' ? 'active' : ''}`}
            onClick={() => handleTabChange('favoritos')}
          >
            <FaHeart /> Favoritos
          </button>
          <button
            className={`profile-tab ${activeTab === 'configuracoes' ? 'active' : ''}`}
            onClick={() => handleTabChange('configuracoes')}
          >
            <FaCog /> Configurações
          </button>
        </div>

        {/* Tab Content */}
        <div className="profile-content">
          {/* Meus Dados Tab */}
          {activeTab === 'dados' && (
            <div className="profile-tab-content">
              <h2 className="content-title">Informações Pessoais</h2>
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      <FaUser /> Nome Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <FaEnvelope /> Email M&G
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu.email@mgemedicos.com.br"
                      disabled
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="crm">
                      <FaIdCard /> CRM
                    </label>
                    <input
                      type="text"
                      id="crm"
                      name="crm"
                      value={formData.crm}
                      onChange={handleChange}
                      placeholder="123456-SP"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      <FaPhone /> Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(11) 98765-4321"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="specialty">Especialidade</label>
                  <input
                    type="text"
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    placeholder="Cardiologia"
                  />
                </div>

                <button type="submit" className="btn btn-coral btn-lg">
                  <FaSave /> Salvar Alterações
                </button>
              </form>
            </div>
          )}

          {/* Histórico Tab */}
          {activeTab === 'historico' && (
            <div className="profile-tab-content">
              <h2 className="content-title">Histórico de Compras</h2>
              <div className="history-list">
                {purchaseHistory.map((purchase) => (
                  <div key={purchase.id} className="history-card">
                    <img
                      src={purchase.image}
                      alt={purchase.name}
                      className="history-image"
                    />
                    <div className="history-content">
                      <h3 className="history-name">{purchase.name}</h3>
                      <div className="history-details">
                        <span className="history-date">
                          Comprado em {new Date(purchase.date).toLocaleDateString('pt-BR')}
                        </span>
                        <span className={`status-badge-small status-${purchase.status.toLowerCase()}`}>
                          {purchase.status}
                        </span>
                      </div>
                      <div className="history-pricing">
                        <div className="history-amount">
                          <strong>Valor Pago:</strong> R$ {purchase.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="history-savings">
                          <strong>Economia:</strong> R$ {purchase.savings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Favoritos Tab */}
          {activeTab === 'favoritos' && (
            <div className="profile-tab-content">
              <h2 className="content-title">Meus Favoritos</h2>
              <div className="favorites-grid">
                {favorites.map((product) => {
                  const savings = product.oldPrice ? (product.oldPrice - product.memberPrice) : 0;

                  return (
                    <div key={product.id} className="favorite-card">
                      <button className="favorite-remove-btn" title="Remover dos favoritos">
                        <FaTimes />
                      </button>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="favorite-image"
                      />
                      <div className="favorite-content">
                        <span className="favorite-brand">{product.brand}</span>
                        <h3 className="favorite-name">{product.name}</h3>
                        <div className="favorite-rating">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={i < product.rating ? 'star-filled' : 'star-empty'}
                            />
                          ))}
                        </div>
                        <div className="favorite-prices">
                          {product.oldPrice && (
                            <span className="favorite-old-price">
                              R$ {product.oldPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                          )}
                          <span className="favorite-price">
                            R$ {product.memberPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        {savings > 0 && (
                          <div className="favorite-savings">
                            Economia: R$ {savings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </div>
                        )}
                        <button className="btn btn-coral btn-sm">
                          Ver Detalhes
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Configurações Tab */}
          {activeTab === 'configuracoes' && (
            <div className="profile-tab-content">
              <h2 className="content-title">Configurações</h2>
              <div className="settings-section">
                <h3>Notificações</h3>
                <div className="settings-options">
                  <label className="settings-option">
                    <input type="checkbox" defaultChecked />
                    <span>Receber ofertas exclusivas por email</span>
                  </label>
                  <label className="settings-option">
                    <input type="checkbox" defaultChecked />
                    <span>Notificações de novos benefícios</span>
                  </label>
                  <label className="settings-option">
                    <input type="checkbox" />
                    <span>Newsletter semanal</span>
                  </label>
                </div>
              </div>

              <div className="settings-section">
                <h3>Privacidade</h3>
                <div className="settings-options">
                  <label className="settings-option">
                    <input type="checkbox" defaultChecked />
                    <span>Permitir que parceiros vejam minha especialidade</span>
                  </label>
                  <label className="settings-option">
                    <input type="checkbox" />
                    <span>Participar de pesquisas de satisfação</span>
                  </label>
                </div>
              </div>

              <button className="btn btn-coral btn-lg">
                <FaSave /> Salvar Configurações
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
