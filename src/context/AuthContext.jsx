import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const AUTH_STORAGE_KEY = 'mge-benefits-auth';

// Mock users database
const mockUsers = [
  {
    id: 1,
    email: "dr.silva@mgemedicos.com.br",
    name: "Dr. João Silva",
    crm: "123456-SP",
    specialty: "Cardiologia",
    phone: "(11) 98765-4321",
    password: "senha123", // In production: use proper hashing
    role: "doctor",
    registrationDate: "2024-01-15",
    avatar: "https://i.pravatar.cc/150?img=12",
    benefits: {
      totalSavings: 15420.50,
      purchasesCount: 8,
      favoriteCategories: ["viagens-experiencias", "tecnologia-eletronica"]
    }
  },
  {
    id: 2,
    email: "admin@mgemedicos.com.br",
    name: "Admin M&G",
    password: "admin123",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=1",
    benefits: {
      totalSavings: 0,
      purchasesCount: 0,
      favoriteCategories: []
    }
  }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedAuth) {
      try {
        const { userId } = JSON.parse(savedAuth);
        const user = mockUsers.find(u => u.id === userId);
        if (user) {
          setCurrentUser(user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error loading auth:', error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  // Login
  const login = (email, password) => {
    const user = mockUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ userId: user.id }));
      return { success: true, user };
    }

    return { success: false, error: "Email ou senha inválidos" };
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  // Register
  const register = (userData) => {
    // Validate email domain
    if (!userData.email.toLowerCase().endsWith('@mgemedicos.com.br')) {
      return { success: false, error: "Email deve ser @mgemedicos.com.br" };
    }

    // Check if email already exists
    if (mockUsers.find(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      return { success: false, error: "Email já cadastrado" };
    }

    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      role: "doctor",
      registrationDate: new Date().toISOString().split('T')[0],
      avatar: `https://i.pravatar.cc/150?img=${mockUsers.length + 1}`,
      benefits: {
        totalSavings: 0,
        purchasesCount: 0,
        favoriteCategories: []
      }
    };

    mockUsers.push(newUser);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ userId: newUser.id }));

    return { success: true, user: newUser };
  };

  // Request password reset
  const requestPasswordReset = (email) => {
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      console.log('Password reset email sent to:', email);
      return { success: true, message: "Email de recuperação enviado com sucesso" };
    }
    return { success: false, error: "Email não encontrado" };
  };

  // Update profile
  const updateProfile = (updates) => {
    if (!currentUser) return { success: false, error: "Não autenticado" };

    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);

    // Update in mockUsers array
    const userIndex = mockUsers.findIndex(u => u.id === currentUser.id);
    if (userIndex >= 0) {
      mockUsers[userIndex] = updatedUser;
    }

    return { success: true, user: updatedUser };
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
    requestPasswordReset,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
