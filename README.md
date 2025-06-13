# 🚢 Russell Catways – API & Interface de gestion du port de plaisance

Application web de gestion des réservations de catways (appontements) pour le port de plaisance de Russell. Ce projet complet inclut un backend Express/MongoDB, une API REST sécurisée avec JWT, une documentation Swagger, et un frontend React avec interface utilisateur responsive.

---

## 🔧 Technologies utilisées

### Backend
- Node.js
- Express.js
- MongoDB (avec Mongoose)
- JWT (jsonwebtoken)
- bcrypt
- express-validator
- Swagger (swagger-jsdoc, swagger-ui-express)
- dotenv

### Frontend
- React.js (Vite)
- Bulma (CSS)
- Axios
- React Router DOM

---

## 🚀 Lancement du projet

### Pré-requis
- Node.js installé (version 18+)
- MongoDB installé ou accès à MongoDB Atlas

### Installation

```bash
git clone https://github.com/votre-utilisateur/russell-catways.git
cd russell-catways
```

#### Backend
```bash
cd backend
npm install
cp .env.example .env # et remplissez les infos de connexion Mongo + JWT_SECRET
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Authentification

- Login via email + password
- Token JWT stocké en localStorage
- Routes protégées via middleware

---

## 📦 Données initiales

Fichiers fournis : `catways.json` et `reservations.json`

```bash
node importData.js
```

Cela importe les catways et réservations dans la base MongoDB.

---

## 🔁 Fonctionnalités

### ✅ Utilisateurs
- CRUD complet
- Authentification JWT
- Accès restreint

### ✅ Catways
- CRUD complet
- Validation des champs

### ✅ Réservations
- CRUD lié à chaque catway
- Dates formatées, champs vérifiés

---

## 🌐 Routes principales

### Auth
- `POST /api/login`
- `GET /api/logout`

### Utilisateurs
- `GET /api/users`
- `POST /api/users`
- `GET /api/users/:email`
- `PUT /api/users/:email`
- `DELETE /api/users/:email`

### Catways
- `GET /api/catways`
- `POST /api/catways`
- `GET /api/catways/:id`
- `PUT /api/catways/:id`
- `DELETE /api/catways/:id`

### Réservations
- `GET /api/catways/:id/reservations`
- `GET /api/catways/:id/reservations/:resId`
- `POST /api/catways/:id/reservations`
- `PUT /api/catways/:id/reservations`
- `DELETE /api/catways/:id/reservations/:resId`

---

## 🧪 Test des routes

Utilisez Postman ou Swagger pour tester toutes les routes :
- [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 🖥️ Pages frontend

- `/` : page d’accueil (login + présentation + lien Swagger)
- `/dashboard` : tableau de bord utilisateur
- `/catways` : CRUD Catways
- `/reservations` : CRUD Réservations
- `/users` : CRUD Utilisateurs
- `*` : page 404

---

## © Russell Catways – Azshira
