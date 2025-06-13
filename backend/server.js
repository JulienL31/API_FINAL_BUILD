
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const errorMiddleware = require('./middlewares/error.middleware');
const authMiddleware = require('./middlewares/auth.middleware');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const catwayRoutes = require('./routes/catway.routes');
const reservationRoutes = require('./routes/reservation.routes');

const userController = require('./controllers/user.controller');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  res.json({
    api: 'up',
    db: dbState === 1 ? 'connected' : 'disconnected'
  });
});

// ➕ Auth route libre
console.log("➡️ Auth routes init");
app.use('/api/login', authRoutes);

// ➕ Register libre
const publicUserRoutes = express.Router();
publicUserRoutes.post('/', userController.register);
app.use('/api/users', publicUserRoutes);

// 🔒 Routes protégées
console.log("📦 Other routes init (secured)");
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/catways', authMiddleware, catwayRoutes);
app.use('/api/reservations', authMiddleware, reservationRoutes);


// Swagger & erreur
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
