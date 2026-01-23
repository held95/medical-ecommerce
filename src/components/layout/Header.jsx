import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaShoppingCart, FaUserMd } from 'react-icons/fa';

function Header() {
  const { getCartCount } = useCart();

  return (
    <header style={{
      backgroundColor: '#007bff',
      color: 'white',
      padding: '1rem 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <FaUserMd /> MediShop
        </Link>

        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'white' }}>Início</Link>
          <Link to="/products" style={{ color: 'white' }}>Produtos</Link>
          <Link to="/admin" style={{ color: 'white' }}>Admin</Link>
          <Link to="/cart" style={{
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            position: 'relative'
          }}>
            <FaShoppingCart />
            {getCartCount() > 0 && (
              <span style={{
                backgroundColor: '#dc3545',
                borderRadius: '50%',
                padding: '0.25rem 0.5rem',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                minWidth: '20px',
                textAlign: 'center'
              }}>
                {getCartCount()}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
