import api from './api';

export const authService = {
  // Login
  login: async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      console.log('AuthService: Resposta completa da API:', response.data); // Debug
      
      // Extrair os dados corretos da resposta
      const { data } = response.data; // Pega o 'data' de dentro da resposta
      
      if (data.token) {
        // Retornar no formato que o contexto espera
        return {
          token: data.token,
          user: data.user
        };
      }
      
      throw new Error('Token não encontrado na resposta');
    } catch (error) {
      console.error('AuthService: Erro no login:', error);
      throw error.response?.data || error.message;
    }
  },

  // Registrar usuário
  register: async (userData) => {
    try {
      const response = await api.post('/api/auth/register', userData);
      console.log('AuthService: Resposta do registro:', response.data); // Debug
      
      // Extrair os dados corretos da resposta
      const { data } = response.data;
      
      if (data.token) {
        return {
          token: data.token,
          user: data.user
        };
      }
      
      throw new Error('Token não encontrado na resposta');
    } catch (error) {
      console.error('AuthService: Erro no registro:', error);
      throw error.response?.data || error.message;
    }
  },

  // Resto dos métodos permanecem iguais...
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getProfile: async () => {
    try {
      const response = await api.get('/api/auth/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put('/api/auth/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};