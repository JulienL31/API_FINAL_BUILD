import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <aside className="menu has-background-light p-4" style={{ minHeight: '100vh' }}>
    <p className="menu-label">Modules</p>
    <ul className="menu-list">
      <li>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'is-active' : ''}>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/users" className={({ isActive }) => isActive ? 'is-active' : ''}>
          Utilisateurs
        </NavLink>
      </li>
      <li>
        <NavLink to="/reservations" className={({ isActive }) => isActive ? 'is-active' : ''}>
          Réservations
        </NavLink>
      </li>
      <li>
        <NavLink to="/catways" className={({ isActive }) => isActive ? 'is-active' : ''}>
          Catways
        </NavLink>
      </li>
      <li>
        <NavLink to="/docs" className={({ isActive }) => isActive ? 'is-active' : ''}>
          Docs
        </NavLink>
      </li>
    </ul>
  </aside>
);

export default Sidebar;
