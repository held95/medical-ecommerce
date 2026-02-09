import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Public pages
import Home from './pages/Home';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Protected pages
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

// Admin pages
import AdminDashboard from './pages/Admin/Dashboard';

import './styles.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Header />
              <main style={{ flex: 1 }}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />

                  {/* TODO: Dashboard and Profile routes will be added later
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  */}

                  {/* Protected Routes */}
                  <Route
                    path="/benefits"
                    element={
                      <ProtectedRoute>
                        <Products />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/benefits/:id"
                    element={
                      <ProtectedRoute>
                        <ProductDetail />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />

                  {/* Redirect old /products routes to /benefits */}
                  <Route path="/products" element={<Navigate to="/benefits" replace />} />
                  <Route path="/products/:id" element={<Navigate to="/benefits/:id" replace />} />

                  {/* Admin Routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute adminOnly={true}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />

                  {/* Catch-all */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
