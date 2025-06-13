
import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function Catways() {
  const [catways, setCatways] = useState([]);
  const [form, setForm] = useState({ catwayNumber: '', catwayType: '', catwayState: '' });
  const [editing, setEditing] = useState(null);

  const fetchCatways = async () => {
    try {
      const res = await api.get('/catways');
      setCatways(res.data);
    } catch (err) {
      console.error('Erreur fetch catways:', err);
    }
  };

  useEffect(() => {
    fetchCatways();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/catways/${editing.catwayNumber}`, {
          catwayState: form.catwayState,
        });
      } else {
        await api.post('/catways', form);
      }
      setForm({ catwayNumber: '', catwayType: '', catwayState: '' });
      setEditing(null);
      fetchCatways();
    } catch (err) {
      console.error('Erreur submit catway:', err);
    }
  };

  const handleEdit = (c) => {
    setEditing(c);
    setForm({
      catwayNumber: c.catwayNumber,
      catwayType: c.catwayType,
      catwayState: c.catwayState,
    });
  };

  const handleDelete = async (catwayNumber) => {
    if (window.confirm('Supprimer ce catway ?')) {
      try {
        await api.delete(`/catways/${catwayNumber}`);
        fetchCatways();
      } catch (err) {
        console.error('Erreur delete catway:', err);
      }
    }
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-primary">Gestion des Catways</h1>

        <form onSubmit={handleSubmit} className="box mb-5">
          {!editing && (
            <>
              <div className="field">
                <label className="label">Numéro</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={form.catwayNumber}
                    onChange={(e) => setForm({ ...form, catwayNumber: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Type</label>
                <div className="control">
                  <div className="select">
                    <select
                      value={form.catwayType}
                      onChange={(e) => setForm({ ...form, catwayType: e.target.value })}
                      required
                    >
                      <option value="">-- Choisir --</option>
                      <option value="long">Long</option>
                      <option value="short">Short</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="field">
            <label className="label">État</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={form.catwayState}
                onChange={(e) => setForm({ ...form, catwayState: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="field is-grouped mt-4">
            <div className="control">
              <button className="button is-primary" type="submit">
                {editing ? 'Mettre à jour' : 'Créer'}
              </button>
            </div>
            {editing && (
              <div className="control">
                <button
                  className="button is-light"
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setForm({ catwayNumber: '', catwayType: '', catwayState: '' });
                  }}
                >
                  Annuler
                </button>
              </div>
            )}
          </div>
        </form>

        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Numéro</th>
              <th>Type</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {catways.map((c) => (
              <tr key={c._id}>
                <td>{c.catwayNumber}</td>
                <td>{c.catwayType}</td>
                <td>{c.catwayState}</td>
                <td>
                  <button className="button is-small is-info mr-2" onClick={() => handleEdit(c)}>
                    Modifier
                  </button>
                  <button className="button is-small is-danger" onClick={() => handleDelete(c.catwayNumber)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Catways;
