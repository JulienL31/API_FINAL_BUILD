import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar is-link" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/dashboard" className="navbar-item has-text-weight-bold">
          ⚓ Russell Catways
        </Link>
      </div>

      <div className="navbar-menu is-active">
        <div className="navbar-start">
          <Link to="/catways" className="navbar-item">Catways</Link>
          <Link to="/reservations" className="navbar-item">Réservations</Link>
          <Link to="/users" className="navbar-item">Utilisateurs</Link>
          <a href="https://api-final-build.onrender.com/api-docs" className="navbar-item" target="_blank" rel="noreferrer">Documentation Swagger</a>
        </div>

        <div className="navbar-end">
          <button className="button is-light m-2" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
