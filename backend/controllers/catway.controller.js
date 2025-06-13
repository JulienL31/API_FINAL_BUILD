const svc = require('../services/catway.service');

exports.createCatway = async (req, res, next) => {
  try { const c = await svc.createCatway(req.body); res.status(201).json(c); } catch (e) { next(e); }
};
exports.getAllCatways = async (req, res, next) => {
  try { res.json(await svc.getAllCatways()); } catch (e) { next(e); }
};
exports.getCatway = async (req, res, next) => {
  try {
    const c = await svc.getCatwayById(req.params.id);
    if (!c) return res.status(404).json({ message: 'Passerelle non trouvée' });
    res.json(c);
  } catch (e) { next(e); }
};
exports.updateCatway = async (req, res, next) => {
  try { res.json(await svc.updateCatwayState(req.params.id, req.body.catwayState)); } catch (e) { next(e); }
};
exports.deleteCatway = async (req, res, next) => {
  try { await svc.deleteCatway(req.params.id); res.status(204).end(); } catch (e) { next(e); }
};