import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserMd, FaPhone, FaWhatsapp, FaBars, FaTimes, FaSearch, FaUser, FaSignOutAlt, FaCog, FaTachometerAlt } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import './Header.css';

function Header() {
  const { getCartCount } = useCart();
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* Topbar com contatos */}
      <div className="header-topbar">
        <div className="container">
          <div className="topbar-content">
            <div className="topbar-left">
              <a href="tel:+551633333333" className="topbar-link">
                <FaPhone /> (16) 3333-3333
              </a>
              <a
                href="https://wa.me/5516999999999"
                className="topbar-link topbar-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
            <div className="topbar-right hide-mobile">
              <span className="topbar-badge">Benefícios Exclusivos para Médicos M&G</span>
              <span className="topbar-badge topbar-badge-premium">100+ Parceiros Premium</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header Principal */}
      <header className="header-main">
        <div className="container">
          <div className="header-content">
            {/* Logo Premium */}
            <Link to="/" className="header-logo">
              <div className="logo-icon">
                <FaUserMd />
              </div>
              <div className="logo-text">
                <span className="logo-title">M&G Benefits</span>
                <span className="logo-subtitle hide-mobile">Portal do Médico</span>
              </div>
            </Link>

            {/* Busca */}
            <div className="header-search hide-mobile">
              <input
                type="search"
                placeholder="Buscar benefícios..."
                className="search-input"
              />
              <button className="search-button">
                <FaSearch />
              </button>
            </div>

            {/* Navegação Desktop */}
            <nav className="header-nav desktop-nav">
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                Início
              </NavLink>
              {isAuthenticated && (
                <NavLink
                  to="/benefits"
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                  Benefícios
                </NavLink>
              )}
            </nav>

            {/* Auth Actions */}
            <div className="header-auth desktop-nav">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="btn btn-outline-navy" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    Entrar
                  </Link>
                  <Link to="/register" className="btn btn-coral" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    Cadastrar
                  </Link>
                </>
              ) : (
                <div className="user-menu-container">
                  <button
                    className="user-menu-button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <FaUser />
                    <span className="hide-mobile">{currentUser?.name?.split(' ')[0] || 'Usuário'}</span>
                  </button>
                  {userMenuOpen && (
                    <>
                      <div className="user-menu-backdrop" onClick={() => setUserMenuOpen(false)} />
                      <div className="user-menu-dropdown">
                        <div className="user-menu-header">
                          <strong>{currentUser?.name}</strong>
                          <small>{currentUser?.email}</small>
                        </div>
                        <Link to="/dashboard" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                          <FaTachometerAlt /> Meu Painel
                        </Link>
                        <Link to="/profile" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                          <FaCog /> Meu Perfil
                        </Link>
                        {currentUser?.role === 'admin' && (
                          <Link to="/admin" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                            <FaTachometerAlt /> Admin
                          </Link>
                        )}
                        <button className="user-menu-item user-menu-logout" onClick={handleLogout}>
                          <FaSignOutAlt /> Sair
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Carrinho Premium */}
            <Link to="/cart" className="header-cart">
              <div className="cart-icon-wrapper">
                <FaShoppingCart className="cart-icon" />
                {getCartCount() > 0 && (
                  <span className="cart-badge">{getCartCount()}</span>
                )}
              </div>
              <div className="cart-text hide-mobile">
                <span className="cart-label">Carrinho</span>
                <span className="cart-count">{getCartCount()} {getCartCount() === 1 ? 'item' : 'itens'}</span>
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <>
          <div className="mobile-menu-backdrop" onClick={() => setMenuOpen(false)} />
          <nav className="mobile-menu">
            {isAuthenticated && currentUser && (
              <div className="mobile-user-info">
                <strong>{currentUser.name}</strong>
                <small>{currentUser.email}</small>
              </div>
            )}

            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Início
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink
                  to="/benefits"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => isActive ? "active" : ""}
                >
                  Benefícios
                </NavLink>
                <NavLink
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => isActive ? "active" : ""}
                >
                  Meu Painel
                </NavLink>
                <NavLink
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => isActive ? "active" : ""}
                >
                  Carrinho ({getCartCount()})
                </NavLink>
                {currentUser?.role === 'admin' && (
                  <NavLink
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) => isActive ? "active" : ""}
                  >
                    Admin
                  </NavLink>
                )}
                <button
                  className="mobile-menu-logout"
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                >
                  <FaSignOutAlt /> Sair
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => isActive ? "active" : ""}
                >
                  Entrar
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => isActive ? "active" : ""}
                >
                  Cadastrar
                </NavLink>
              </>
            )}

            {/* Busca Mobile */}
            <div className="mobile-search">
              <input
                type="search"
                placeholder="Buscar benefícios..."
                className="search-input"
              />
              <button className="search-button">
                <FaSearch />
              </button>
            </div>
          </nav>
        </>
      )}
    </>
  );
}

export default Header;
