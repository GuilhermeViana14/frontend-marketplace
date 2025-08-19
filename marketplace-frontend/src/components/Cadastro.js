import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/Cadastro.css'
const Cadastro = () => {
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' // user, seller, admin
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    try {
      // MUDANÇA: Passar o objeto completo ao invés de só email e password
      await register(formData);
      navigate('/');
    } catch (error) {
      setError(error.message || 'Erro ao fazer cadastro');
    } finally {
      setLoading(false);
    }
  };
return (
  <div className="cadastro-container">
    <h2>Cadastro</h2>
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Nome:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Senha:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Confirmar Senha:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      {/* ADICIONE ESTE CAMPO */}
      <div>
        <label>Tipo de usuário:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">Comprador</option>
          <option value="seller">Vendedor</option>
        </select>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>

    <p>
      Já possui uma conta? <a href="/login">Faça login</a>
    </p>
  </div>
);
};

export default Cadastro;