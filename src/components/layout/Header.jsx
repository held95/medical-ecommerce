import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart, FaUserMd, FaPhone, FaWhatsapp, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import './Header.css';

function Header() {
  const { getCartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

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
              <span className="topbar-badge">Frete Grátis Sul/Sudeste</span>
              <span className="topbar-badge topbar-badge-premium">Atendimento Especializado</span>
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
                <span className="logo-title">Medical</span>
                <span className="logo-subtitle hide-mobile">E-commerce Premium</span>
              </div>
            </Link>

            {/* Busca */}
            <div className="header-search hide-mobile">
              <input
                type="search"
                placeholder="Buscar produtos médicos..."
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
              <NavLink
                to="/products"
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                Produtos
              </NavLink>
              <NavLink
                to="/admin"
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                Admin
              </NavLink>
            </nav>

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
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Início
            </NavLink>
            <NavLink
              to="/products"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Produtos
            </NavLink>
            <NavLink
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Admin
            </NavLink>
            <NavLink
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Carrinho ({getCartCount()})
            </NavLink>

            {/* Busca Mobile */}
            <div className="mobile-search">
              <input
                type="search"
                placeholder="Buscar produtos..."
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
