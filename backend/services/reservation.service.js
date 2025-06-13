const Reservation = require('../models/Reservation');

exports.createReservation = (catwayId, data) => {
  data.catway = catwayId;
  return Reservation.create(data);
};
exports.getReservationsByCatway = catwayId => Reservation.find({ catway: catwayId });
exports.getReservationById = id => Reservation.findById(id);
exports.updateReservation = (id, data) => Reservation.findByIdAndUpdate(id, data, { new: true });
exports.deleteReservation = id => Reservation.findByIdAndDelete(id);