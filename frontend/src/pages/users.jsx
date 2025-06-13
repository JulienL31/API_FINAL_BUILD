import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [editingEmail, setEditingEmail] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Erreur chargement utilisateurs:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEmail) {
        await api.put(`/users/${editingEmail}`, form);
      } else {
        await api.post('/users', form);
      }
      setForm({ username: '', email: '', password: '' });
      setEditingEmail(null);
      fetchUsers();
    } catch (err) {
      console.error('Erreur lors de la soumission:', err);
    }
  };

  const handleEdit = (user) => {
    setForm({ username: user.username, email: user.email, password: '' });
    setEditingEmail(user.email);
  };

  const handleDelete = async (email) => {
    try {
      await api.delete(`/users/${email}`);
      fetchUsers();
    } catch (err) {
      console.error('Erreur suppression:', err);
    }
  };

  return (
    <div className="box">
      <h1 className="title is-4">Gestion des utilisateurs</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="field">
          <label className="label">Nom d'utilisateur</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={!!editingEmail}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Mot de passe</label>
          <div className="control">
            <input
              className="input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required={!editingEmail}
            />
          </div>
        </div>

        <div className="field mt-3">
          <div className="control">
            <button className="button is-link" type="submit">
              {editingEmail ? 'Modifier' : 'Créer'} l'utilisateur
            </button>
            {editingEmail && (
              <button
                type="button"
                className="button is-light ml-2"
                onClick={() => {
                  setEditingEmail(null);
                  setForm({ username: '', email: '', password: '' });
                }}
              >
                Annuler
              </button>
            )}
          </div>
        </div>
      </form>

      <hr />

      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.email}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>
                <button className="button is-small is-info mr-2" onClick={() => handleEdit(u)}>
                  ✏️
                </button>
                <button className="button is-small is-danger" onClick={() => handleDelete(u.email)}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
