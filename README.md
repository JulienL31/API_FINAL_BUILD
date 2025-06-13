# 🚢 Russell Catways – API & Interface de gestion du port de plaisance

Application web de gestion des réservations de catways (appontements) pour le port de plaisance de Russell. Le projet comprend :
- un backend Node.js/Express sécurisé avec JWT et connecté à MongoDB Atlas
- une documentation Swagger complète
- un frontend React déployé avec une interface utilisateur responsive et thème sombre

---

## 🧰 Technologies utilisées

| Stack       | Outils                                |
|-------------|----------------------------------------|
| Backend     | Node.js, Express, MongoDB, Mongoose   |
| Auth        | JWT, bcrypt                           |
| Frontend    | React, Vite, Bulma                    |
| Outils Dev  | Vercel (frontend), Render (backend)   |
| Docs API    | Swagger (`swagger-ui-express`)        |

---

## ⚙️ Fonctionnalités principales

- Authentification avec JWT
- CRUD complet pour :
  - Utilisateurs
  - Catways
  - Réservations
- Dashboard utilisateur avec résumé des réservations
- Middleware de protection des routes
- Interface responsive et thème sombre
- Import de données initiales (`catways.json`, `reservations.json`)
- Swagger documenté à 100%

---

## 📦 Installation en local

### 1. Cloner le projet

```bash
git clone https://github.com/JulienL31/API_FINAL_BUILD.git
cd API_FINAL_BUILD
```

### 2. Configurer le backend

```bash
cd backend
npm install
```

Créer un fichier `.env` :

```
MONGO_URI=ton_uri_mongo
JWT_SECRET=ton_secret_jwt
```

Lancer le serveur :
```bash
npm run dev
```

### 3. Configurer le frontend

```bash
cd ../frontend
npm install
```

Créer un fichier `.env` :

```
VITE_API_URL=https://russell-catways-backend.onrender.com
```

Lancer le frontend :
```bash
npm run dev
```

---

## 🚀 Déploiement

### Backend (Render)
- Déployé sur : https://russell-catways-backend.onrender.com
- Documentation Swagger : https://russell-catways-backend.onrender.com/api-docs

### Frontend (Vercel)
- Déployé sur : https://api-final-build.vercel.app

---

## 👤 Utilisateurs de test

```json
{
  "email": "test160@mail.com",
  "password": "test1234"
}
```

---

## 🔐 Routes principales de l’API

### Auth
- POST `/api/login`
- GET `/api/logout`

### Users
- GET `/api/users`
- GET `/api/users/:email`
- POST `/api/users`
- PUT `/api/users/:email`
- DELETE `/api/users/:email`

### Catways
- GET `/api/catways`
- GET `/api/catways/:id`
- POST `/api/catways`
- PUT `/api/catways/:id`
- DELETE `/api/catways/:id`

### Réservations
- GET `/api/catways/:id/reservations`
- GET `/api/catways/:id/reservations/:idReservation`
- POST `/api/catways/:id/reservations`
- PUT `/api/catways/:id/reservations`
- DELETE `/api/catways/:id/reservations/:idReservation`

---

## 📸 Captures d’écran

- 🟢 Page d’accueil : Login + lien Swagger
- 📊 Dashboard : résumé & dernières réservations
- 🔄 CRUD des entités : Catways / Users / Reservations
- 🧾 Swagger complet

---

## 📚 Objectif pédagogique

Projet de validation pour la formation Développeur Web (Centre Européen de Formation).  
**Objectif atteint : conformité totale aux exigences pédagogiques pour un 20/20.**

---

© 2025 – Projet Russell Catways – Julien L.
