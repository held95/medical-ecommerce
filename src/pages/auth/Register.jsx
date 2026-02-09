import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaPhone } from 'react-icons/fa';
import './Login.css'; // Reusing login styles

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    crm: '',
    specialty: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos obrigatórios');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    // Attempt registration
    const result = register({
      name: formData.name,
      email: formData.email,
      crm: formData.crm,
      specialty: formData.specialty,
      phone: formData.phone,
      password: formData.password
    });

    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper" style={{ maxWidth: '600px', gridTemplateColumns: '1fr' }}>
        <div className="login-form-container">
          <div className="login-form-wrapper" style={{ maxWidth: '100%' }}>
            <div className="login-form-header">
              <h2>Cadastro de Médico</h2>
              <p>Crie sua conta e aproveite benefícios exclusivos</p>
            </div>

            {error && (
              <div className="login-error">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="name">
                  <FaUser /> Nome Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Dr. João Silva"
                  disabled={loading}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope /> Email M&G *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu.email@mgemedicos.com.br"
                  disabled={loading}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="specialty">
                  Especialidade
                </label>
                <input
                  type="text"
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  placeholder="Cardiologia"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <FaLock /> Senha *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  disabled={loading}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  <FaLock /> Confirmar Senha *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Digite a senha novamente"
                  disabled={loading}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-coral btn-block"
                disabled={loading}
              >
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </button>
            </form>

            <div className="login-footer">
              <p>
                Já tem uma conta?{' '}
                <Link to="/login" className="text-coral">
                  Entrar
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
