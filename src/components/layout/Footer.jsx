function Footer() {
  return (
    <footer style={{
      backgroundColor: '#212529',
      color: 'white',
      padding: '2rem 0',
      marginTop: '3rem',
      textAlign: 'center'
    }}>
      <div className="container">
        <p>&copy; 2026 MediShop - E-commerce de Produtos Médicos</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6c757d' }}>
          Desenvolvido com React.js
        </p>
      </div>
    </footer>
  );
}

export default Footer;
