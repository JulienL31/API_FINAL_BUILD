const svc = require('../services/user.service');

exports.register = async (req, res, next) => {
  try { res.status(201).json(await svc.createUser(req.body)); } catch (e) { next(e); }
};
exports.getAllUsers = async (req, res, next) => {
  try { res.json(await svc.getAllUsers()); } catch (e) { next(e); }
};
exports.getUser = async (req, res, next) => {
  try {
    const u = await svc.getUserByEmail(req.params.email);
    if (!u) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(u);
  } catch (e) { next(e); }
};
exports.updateUser = async (req, res, next) => {
  try { res.json(await svc.updateUser(req.params.email, req.body)); } catch (e) { next(e); }
};
exports.deleteUser = async (req, res, next) => {
  try { await svc.deleteUser(req.params.email); res.status(204).end(); } catch (e) { next(e); }
};
exports.login = async (req, res, next) => {
  try { res.json(await svc.loginUser(req.body)); } catch (e) { next(e); }
};
exports.logout = (req, res) => res.json({ message: 'Déconnecté avec succès' });