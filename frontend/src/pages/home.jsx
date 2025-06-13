
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/login', { email, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      } else {
        setError('Identifiants invalides');
      }
    } catch (err) {
      console.error('Erreur de login:', err);
      setError('Email ou mot de passe incorrect.');
    }
  };

  return (
    <section className="section has-background-light is-fullheight">
      <div className="container">
        <div className="box mt-6">
          <h1 className="title has-text-centered has-text-primary">
            ⚓ Russell Catways
          </h1>
          <p className="subtitle has-text-centered">
            Bienvenue sur l’interface de gestion du Port de Plaisance de Russell.<br />
            Connectez-vous pour accéder au tableau de bord, gérer les catways, les réservations et les utilisateurs.
          </p>

          <form onSubmit={handleLogin} className="box">
            <div className="field">
              <label className="label">Adresse e-mail</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Mot de passe</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <p className="has-text-danger has-text-centered">{error}</p>
            )}

            <div className="field is-grouped is-justify-content-center mt-4">
              <div className="control">
                <button type="submit" className="button is-primary">
                  Connexion
                </button>
              </div>
            </div>
          </form>

          <div className="has-text-centered mt-4">
            <a
              href="https://api-final-build.onrender.com/api-docs"
              className="button is-info is-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              📚 Voir la documentation API (Swagger)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
