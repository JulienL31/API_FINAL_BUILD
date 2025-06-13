import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/login', { email, password }); 
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        setError('Échec de la connexion. Vérifiez vos identifiants.');
      }
    } catch (err) {
      console.error("Erreur login:", err);
      setError('Email ou mot de passe incorrect.');
    }
  };

  return (
    <section className="hero is-fullheight has-background-light" style={{ background: 'linear-gradient(to bottom right, #e8f4fd, #f4fbff)' }}>
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="box" style={{ maxWidth: '400px', margin: '0 auto', background: '#ffffff', border: '2px solid #cde3f8', borderRadius: '12px' }}>
            <h1 className="title has-text-link mb-4">Connexion</h1>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label has-text-link">Email</label>
                <div className="control">
                  <input
                    className="input is-info"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="ex: admin@example.com"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-link">Mot de passe</label>
                <div className="control">
                  <input
                    className="input is-info"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="********"
                  />
                </div>
              </div>
              {error && <p className="has-text-danger mt-3">{error}</p>}
              <div className="field mt-5">
                <div className="control">
                  <button type="submit" className="button is-link is-fullwidth">Se connecter</button>
                </div>
              </div>
            </form>
            <p className="has-text-grey-light mt-4 is-size-7">© Russell Marina 2025</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
