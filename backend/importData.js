const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const Catway = require("./models/Catway");
const Reservation = require("./models/Reservation");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connexion MongoDB réussie");
    importData();
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion MongoDB :", err);
  });

async function importData() {
  try {
    // On vide les collections
    await Catway.deleteMany();
    await Reservation.deleteMany();

    // Lecture des fichiers
    const catways = JSON.parse(fs.readFileSync(path.join(__dirname, "catways.json"), "utf-8"));
    const reservations = JSON.parse(fs.readFileSync(path.join(__dirname, "reservations.json"), "utf-8"));

    // Insertion des catways
    const insertedCatways = await Catway.insertMany(catways);
    const catwayMap = {};
    insertedCatways.forEach((catway) => {
      catwayMap[catway.catwayNumber] = catway._id;
    });

    // Préparation des réservations avec lien vers catway (_id)
    const formattedReservations = reservations.map((reservation) => ({
      clientName: reservation.clientName,
      boatName: reservation.boatName,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      catway: catwayMap[reservation.catwayNumber], // lien vers Catway._id
    }));

    // Insertion des réservations
    await Reservation.insertMany(formattedReservations);

    console.log("✅ Données importées avec succès");
    process.exit();
  } catch (err) {
    console.error("❌ Erreur lors de l'import :", err);
    process.exit(1);
  }
}
