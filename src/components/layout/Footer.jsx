import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCertificate, FaTruck, FaShieldAlt, FaCreditCard } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      {/* Trust Bar */}
      <div className="footer-trust-bar">
        <div className="container">
          <div className="trust-items">
            <div className="trust-item">
              <FaCertificate className="trust-icon" />
              <div>
                <strong>Certificado ANVISA</strong>
                <span>Todos os produtos regularizados</span>
              </div>
            </div>
            <div className="trust-item">
              <FaTruck className="trust-icon" />
              <div>
                <strong>Frete Grátis</strong>
                <span>Sul e Sudeste acima de R$ 500</span>
              </div>
            </div>
            <div className="trust-item">
              <FaShieldAlt className="trust-icon" />
              <div>
                <strong>Compra Segura</strong>
                <span>Certificado SSL e criptografia</span>
              </div>
            </div>
            <div className="trust-item">
              <FaCreditCard className="trust-icon" />
              <div>
                <strong>Parcele em 6x</strong>
                <span>Sem juros no cartão</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Principal */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Sobre */}
            <div className="footer-column">
              <h3 className="footer-title">Medical E-commerce</h3>
              <p className="footer-description">
                Sua loja especializada em equipamentos médicos de alta qualidade.
                Atendemos profissionais da saúde em todo o Brasil desde 2010.
              </p>
              <div className="footer-social">
                <a href="#" className="social-link" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
                <a href="https://wa.me/5516999999999" className="social-link social-whatsapp" aria-label="WhatsApp">
                  <FaWhatsapp />
                </a>
              </div>
            </div>

            {/* Links Rápidos */}
            <div className="footer-column">
              <h4 className="footer-heading">Institucional</h4>
              <ul className="footer-links">
                <li><a href="#">Sobre Nós</a></li>
                <li><a href="#">Política de Privacidade</a></li>
                <li><a href="#">Termos de Uso</a></li>
                <li><a href="#">Trocas e Devoluções</a></li>
                <li><a href="#">Formas de Pagamento</a></li>
              </ul>
            </div>

            {/* Atendimento */}
            <div className="footer-column">
              <h4 className="footer-heading">Atendimento</h4>
              <ul className="footer-contact">
                <li>
                  <FaPhone />
                  <span>(16) 3333-3333</span>
                </li>
                <li>
                  <FaWhatsapp />
                  <span>(16) 99999-9999</span>
                </li>
                <li>
                  <FaEnvelope />
                  <span>contato@medical.com.br</span>
                </li>
                <li>
                  <FaMapMarkerAlt />
                  <span>Franca - SP, Brasil</span>
                </li>
              </ul>
              <p className="footer-hours">
                <strong>Horário de Atendimento:</strong><br />
                Seg-Sex: 8h às 18h<br />
                Sáb: 8h às 12h
              </p>
            </div>

            {/* Newsletter */}
            <div className="footer-column">
              <h4 className="footer-heading">Newsletter</h4>
              <p className="footer-newsletter-text">
                Receba ofertas exclusivas e novidades em equipamentos médicos.
              </p>
              <form className="footer-newsletter-form" onSubmit={(e) => {
                e.preventDefault();
                alert('Obrigado por se inscrever!');
              }}>
                <input
                  type="email"
                  placeholder="Seu e-mail profissional"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-button">
                  Inscrever
                </button>
              </form>
              <p className="footer-newsletter-privacy">
                Seus dados estão seguros. Não compartilhamos informações.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2026 Medical E-commerce. Todos os direitos reservados.
            </p>
            <div className="footer-payment-info">
              <span>Aceitamos: Cartão de Crédito, PIX, Boleto</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
