import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authServices';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar se há um usuário logado ao carregar a aplicação
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        if (token && savedUser) {
          // Se tiver token e usuário salvos, restaurar o estado
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        // Se der erro, limpar dados inválidos
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

const login = async (email, password) => {
  try {
    console.log('AuthContext: Chamando authService.login'); // Debug
    const data = await authService.login(email, password);
    console.log('AuthContext: Dados recebidos:', data); // Debug
    
    setUser(data.user);
    console.log('AuthContext: User setado:', data.user); // Debug
    
    // Salvar no localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    console.log('AuthContext: Dados salvos no localStorage'); // Debug
    
    return data;
  } catch (error) {
    console.error('AuthContext: Erro no login:', error); // Debug
    throw error;
  }
};

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      setUser(data.user);
      // Salvar no localStorage após registro
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    // Remover dados do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};