import { useProducts } from '../../context/ProductContext';
import { FaBox, FaShoppingCart, FaDollarSign, FaClock } from 'react-icons/fa';

function Dashboard() {
  const { getStats, getOrders, getOrdersByStatus } = useProducts();
  const stats = getStats();
  const recentOrders = getOrders().slice(0, 5);

  const statusColors = {
    'pendente': '#ffc107',
    'processando': '#17a2b8',
    'enviado': '#007bff',
    'entregue': '#28a745'
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Dashboard Administrativo</h1>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        <div style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <FaDollarSign style={{ fontSize: '2rem', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            R$ {stats.totalRevenue.toFixed(2)}
          </h3>
          <p>Receita Total</p>
        </div>

        <div style={{
          backgroundColor: '#28a745',
          color: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <FaShoppingCart style={{ fontSize: '2rem', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            {stats.totalOrders}
          </h3>
          <p>Total de Pedidos</p>
        </div>

        <div style={{
          backgroundColor: '#17a2b8',
          color: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <FaBox style={{ fontSize: '2rem', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            {stats.totalProducts}
          </h3>
          <p>Produtos Cadastrados</p>
        </div>

        <div style={{
          backgroundColor: '#ffc107',
          color: '#212529',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <FaClock style={{ fontSize: '2rem', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            {stats.pendingCount}
          </h3>
          <p>Pedidos Pendentes</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Pedidos Recentes</h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Número</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Cliente</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Data</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Valor</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '1rem' }}>
                    <strong>{order.orderNumber}</strong>
                  </td>
                  <td style={{ padding: '1rem' }}>{order.customer.name}</td>
                  <td style={{ padding: '1rem' }}>
                    {new Date(order.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold' }}>
                    R$ {order.total.toFixed(2)}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <span style={{
                      backgroundColor: statusColors[order.status],
                      color: order.status === 'pendente' ? '#212529' : 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '999px',
                      fontSize: '0.875rem',
                      fontWeight: 'bold'
                    }}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginTop: '2rem'
      }}>
        <button className="btn btn-primary" style={{ padding: '1rem' }}>
          Gerenciar Produtos
        </button>
        <button className="btn btn-secondary" style={{ padding: '1rem' }}>
          Ver Todos os Pedidos
        </button>
        <button className="btn" style={{
          padding: '1rem',
          backgroundColor: '#6c757d',
          color: 'white'
        }}>
          Relatórios
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
