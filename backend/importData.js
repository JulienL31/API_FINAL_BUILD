const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const bcrypt = require('bcrypt');
const Catway = require('./models/Catway');
const Reservation = require('./models/Reservation');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

// Import des données JSON
const catways = JSON.parse(fs.readFileSync('./catways.json', 'utf-8'));
const reservations = JSON.parse(fs.readFileSync('./reservations.json', 'utf-8'));

const importData = async () => {
  try {
    await connectDB();

    // Nettoyage des collections
    await Catway.deleteMany();
    await Reservation.deleteMany();
    await User.deleteMany();

    // Insertion des catways
    const insertedCatways = await Catway.insertMany(catways);

    // Mise à jour des réservations pour associer les bons IDs de catway
    const formattedReservations = reservations.map((reservation) => {
      const catway = insertedCatways.find(c => c.catwayNumber === reservation.catwayNumber);
      return {
        ...reservation,
        catway: catway ? catway._id : null
      };
    }).filter(r => r.catway !== null); // on ignore celles qui n'ont pas de correspondance

    await Reservation.insertMany(formattedReservations);

    // Ajout d'un utilisateur admin
    const hashedPassword = await bcrypt.hash('admin1234', 10);
    await User.create({
      username: 'admin',
      email: 'admin@mail.com',
      password: hashedPassword
    });

    console.log('✅ Données importées avec succès');
    process.exit();
  } catch (error) {
    console.error('❌ Erreur lors de l’importation :', error);
    process.exit(1);
  }
};

importData();
