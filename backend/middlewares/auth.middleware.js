const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log(`[AUTH] Tentative d'accès : ${req.method} ${req.originalUrl}`);

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.log("❌ Aucun token fourni");
    return res.status(401).json({ message: 'Aucun token fourni. Accès non autorisé.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("❌ Token invalide");
    return res.status(401).json({ message: 'Token invalide. Accès non autorisé.' });
  }
};
