import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

const Home = () => {
  const { user, logout ,isAuthenticated } = useAuth();
    console.log('User:', user);
  console.log('IsAuthenticated:', isAuthenticated);
  const handleLogout = () => {
    logout();
    window.location.reload(); // Recarregar a página após logout
  };

  return (
   <div className="home-container">
      {/* Header/Navbar */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h1>Marketplace</h1>
          </div>
          <nav className="nav">
            {isAuthenticated ? (
              <>
                <span>Olá, {user?.name}!</span>
                <a href="/perfil">Perfil</a>
                <button onClick={handleLogout} className="logout-btn">
                  Sair
                </button>
              </>
            ) : (
              <>
                <a href="/login">Login</a>
                <a href="/cadastro">Cadastro</a>
              </>
            )}
          </nav>
        </div>
      </header>

      
      <section className="hero">
        <div className="hero-content">
          <h2>
            {isAuthenticated 
              ? `Bem-vindo de volta, ${user?.name}!` 
              : 'Bem-vindo ao Marketplace'
            }
          </h2>
          <p>Encontre os melhores produtos com os melhores preços</p>
          <div className="search-bar">
            <input type="text" placeholder="Buscar produtos..." />
            <button>Buscar</button>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="categories">
        <div className="container">
          <h3>Categorias</h3>
          <div className="categories-grid">
            <div className="category-card">Eletrônicos</div>
            <div className="category-card">Roupas</div>
            <div className="category-card">Casa & Jardim</div>
            <div className="category-card">Esportes</div>
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="featured-products">
        <div className="container">
          <h3>Produtos em Destaque</h3>
          <div className="products-grid">
            <div className="product-card">
              <div className="product-image">Imagem</div>
              <h4>Produto 1</h4>
              <p>R$ 99,99</p>
              <button>Ver Detalhes</button>
            </div>
            <div className="product-card">
              <div className="product-image">Imagem</div>
              <h4>Produto 2</h4>
              <p>R$ 149,99</p>
              <button>Ver Detalhes</button>
            </div>
            <div className="product-card">
              <div className="product-image">Imagem</div>
              <h4>Produto 3</h4>
              <p>R$ 79,99</p>
              <button>Ver Detalhes</button>
            </div>
            <div className="product-card">
              <div className="product-image">Imagem</div>
              <h4>Produto 4</h4>
              <p>R$ 199,99</p>
              <button>Ver Detalhes</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Marketplace. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;