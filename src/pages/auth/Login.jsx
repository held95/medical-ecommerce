import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate fields
    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, insira um email válido');
      setLoading(false);
      return;
    }

    // Attempt login
    const result = login(formData.email, formData.password);

    if (result.success) {
      // Redirect to intended page or dashboard
      navigate(from, { replace: true });
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Side - Hero Image */}
        <div className="login-hero">
          <div className="login-hero-overlay">
            <div className="login-hero-content">
              <FaUser className="login-hero-icon" />
              <h1>M&G Benefits</h1>
              <p>Portal do Médico</p>
              <div className="login-hero-features">
                <div className="login-hero-feature">
                  <span className="feature-icon">✓</span>
                  <span>Descontos Exclusivos</span>
                </div>
                <div className="login-hero-feature">
                  <span className="feature-icon">✓</span>
                  <span>100+ Parceiros Premium</span>
                </div>
                <div className="login-hero-feature">
                  <span className="feature-icon">✓</span>
                  <span>Economia Garantida</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-container">
          <div className="login-form-wrapper">
            <div className="login-form-header">
              <h2>Bem-vindo de volta!</h2>
              <p>Entre com suas credenciais para acessar seus benefícios</p>
            </div>

            {error && (
              <div className="login-error">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu.email@mgemedicos.com.br"
                  disabled={loading}
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <FaLock /> Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Digite sua senha"
                  disabled={loading}
                  autoComplete="current-password"
                />
              </div>

              <div className="login-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Lembrar de mim</span>
                </label>
                {/* TODO: Add ForgotPassword route when page is created
                <Link to="/forgot-password" className="forgot-password">
                  Esqueci minha senha
                </Link>
                */}
              </div>

              <button
                type="submit"
                className="btn btn-coral btn-block"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <div className="login-footer">
              <p>
                Ainda não tem uma conta?{' '}
                {/* TODO: Add Register route when page is created
                <Link to="/register" className="text-coral">
                  Cadastre-se
                </Link>
                */}
                <span className="text-coral" style={{ cursor: 'not-allowed', opacity: 0.6 }}>
                  Cadastre-se (em breve)
                </span>
              </p>
            </div>

            <div className="login-demo-info">
              <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginTop: '2rem', textAlign: 'center' }}>
                <strong>Demo:</strong><br />
                Médico: dr.silva@mgemedicos.com.br / senha123<br />
                Admin: admin@mgemedicos.com.br / admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
