import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [catways, setCatways] = useState([]);
  const [form, setForm] = useState({
    catway: '',
    clientName: '',
    boatName: '',
    startDate: '',
    endDate: '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchReservations = async () => {
    try {
      const res = await api.get('/reservations');
      setReservations(res.data);
    } catch (err) {
      console.error('Erreur chargement réservations:', err);
    }
  };

  const fetchCatways = async () => {
    try {
      const res = await api.get('/catways');
      setCatways(res.data);
    } catch (err) {
      console.error('Erreur chargement catways:', err);
    }
  };

  useEffect(() => {
    fetchReservations();
    fetchCatways();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/reservations/${editingId}`, form);
    } else {
      await api.post('/reservations', form);
    }
    setForm({ catway: '', clientName: '', boatName: '', startDate: '', endDate: '' });
    setEditingId(null);
    fetchReservations();
  };

  const handleEdit = (res) => {
    setForm({
      catway: res.catway,
      clientName: res.clientName,
      boatName: res.boatName,
      startDate: res.startDate.slice(0, 10),
      endDate: res.endDate.slice(0, 10),
    });
    setEditingId(res._id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/reservations/${id}`);
    fetchReservations();
  };

  return (
    <div className="box">
      <h1 className="title is-4">Gestion des réservations</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="field">
          <label className="label">Catway</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select name="catway" value={form.catway} onChange={handleChange} required>
                <option value="">Sélectionner un catway</option>
                {catways.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.catwayNumber} ({c.catwayType})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Nom du client</label>
          <div className="control">
            <input className="input" type="text" name="clientName" value={form.clientName} onChange={handleChange} required />
          </div>
        </div>

        <div className="field">
          <label className="label">Nom du bateau</label>
          <div className="control">
            <input className="input" type="text" name="boatName" value={form.boatName} onChange={handleChange} required />
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <label className="label">Date de début</label>
              <div className="control">
                <input className="input" type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
              </div>
            </div>

            <div className="field">
              <label className="label">Date de fin</label>
              <div className="control">
                <input className="input" type="date" name="endDate" value={form.endDate} onChange={handleChange} required />
              </div>
            </div>
          </div>
        </div>

        <div className="field mt-3">
          <div className="control">
            <button className="button is-link" type="submit">
              {editingId ? 'Modifier' : 'Créer'} la réservation
            </button>
          </div>
        </div>
      </form>

      <hr />

      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Client</th>
            <th>Bateau</th>
            <th>Catway</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r._id}>
              <td>{r.clientName}</td>
              <td>{r.boatName}</td>
              <td>{catways.find((c) => c._id === r.catway)?.catwayNumber || '—'}</td>
              <td>{new Date(r.startDate).toLocaleDateString()}</td>
              <td>{new Date(r.endDate).toLocaleDateString()}</td>
              <td>
                <button className="button is-small is-info mr-2" onClick={() => handleEdit(r)}>
                  ✏️
                </button>
                <button className="button is-small is-danger" onClick={() => handleDelete(r._id)}>
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

export default Reservations;
