const svc = require('../services/reservation.service');

exports.createReservation = async (req, res, next) => {
  try { const r = await svc.createReservation(req.params.id, req.body); res.status(201).json(r); }
  catch (e) { next(e); }
};
exports.getReservations = async (req, res, next) => {
  try { res.json(await svc.getReservationsByCatway(req.params.id)); } catch (e) { next(e); }
};
exports.getReservation = async (req, res, next) => {
  try {
    const r = await svc.getReservationById(req.params.reservationId);
    if (!r) return res.status(404).json({ message: 'Réservation non trouvée' });
    res.json(r);
  } catch (e) { next(e); }
};
exports.updateReservation = async (req, res, next) => {
  try { res.json(await svc.updateReservation(req.params.reservationId, req.body)); } catch (e) { next(e); }
};
exports.deleteReservation = async (req, res, next) => {
  try { await svc.deleteReservation(req.params.reservationId); res.status(204).end(); } catch (e) { next(e); }
};