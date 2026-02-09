import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import './Login.css'; // Reusing login styles

const ForgotPassword = () => {
  const { requestPasswordReset } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    if (!email) {
      setError('Por favor, insira seu email');
      setLoading(false);
      return;
    }

    const result = requestPasswordReset(email);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper" style={{ maxWidth: '500px', gridTemplateColumns: '1fr' }}>
        <div className="login-form-container">
          <div className="login-form-wrapper">
            <div className="login-form-header">
              <h2>Recuperar Senha</h2>
              <p>Insira seu email para receber o link de recuperação</p>
            </div>

            {error && (
              <div className="login-error">
                <span>⚠️</span> {error}
              </div>
            )}

            {success && (
              <div className="login-error" style={{
                backgroundColor: '#e6f4ea',
                borderLeftColor: 'var(--success)',
                color: 'var(--success)'
              }}>
                <span>✓</span> Link de recuperação enviado! Verifique seu email.
              </div>
            )}

            {!success && (
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope /> Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@mgemedicos.com.br"
                    disabled={loading}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-coral btn-block"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar Link'}
                </button>
              </form>
            )}

            <div className="login-footer">
              <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                <FaArrowLeft /> Voltar para login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
