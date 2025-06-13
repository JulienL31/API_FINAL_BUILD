import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [catwayCount, setCatwayCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const currentDate = new Date().toLocaleDateString("fr-FR");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resReservations, resCatways, resUsers] = await Promise.all([
          axios.get("http://localhost:5000/api/reservations", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/catways", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setReservations(resReservations.data);
        setCatwayCount(resCatways.data.length);
        setUserCount(resUsers.data.length);
      } catch (error) {
        console.error("Erreur Dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const lastReservations = reservations
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    .slice(0, 5);

  return (
    <section className="section" style={{ minHeight: "100vh", backgroundColor: "#1e1e1e", color: "#fff" }}>
      <div className="container">
        <h1 className="title has-text-white mb-2">Tableau de bord</h1>
        <p className="subtitle has-text-grey-light">Aujourd'hui : {currentDate}</p>

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="columns is-multiline mb-5">
              <div className="column is-one-third">
                <div className="box has-background-dark has-text-white">
                  <p className="title is-5">Réservations</p>
                  <p className="subtitle is-3 has-text-success">{reservations.length}</p>
                </div>
              </div>
              <div className="column is-one-third">
                <div className="box has-background-dark has-text-white">
                  <p className="title is-5">Catways</p>
                  <p className="subtitle is-3 has-text-info">{catwayCount}</p>
                </div>
              </div>
              <div className="column is-one-third">
                <div className="box has-background-dark has-text-white">
                  <p className="title is-5">Utilisateurs</p>
                  <p className="subtitle is-3 has-text-warning">{userCount}</p>
                </div>
              </div>
            </div>

            <h2 className="title is-4 has-text-white">5 dernières réservations</h2>
            {lastReservations.length === 0 ? (
              <p>Aucune réservation récente.</p>
            ) : (
              <div className="table-container">
                <table className="table is-fullwidth is-striped is-hoverable has-background-dark has-text-light">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Bateau</th>
                      <th>Catway</th>
                      <th>Début</th>
                      <th>Fin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastReservations.map((res) => (
                      <tr key={res._id}>
                        <td>{res.clientName}</td>
                        <td>{res.boatName}</td>
                        <td>{res.catway?.catwayNumber || "?"}</td>
                        <td>{new Date(res.startDate).toLocaleDateString("fr-FR")}</td>
                        <td>{new Date(res.endDate).toLocaleDateString("fr-FR")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
