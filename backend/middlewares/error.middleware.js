// middlewares/error.middleware.js

// Middleware global capturant les erreurs et renvoyant une réponse JSON uniforme
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Erreur serveur' });
};
