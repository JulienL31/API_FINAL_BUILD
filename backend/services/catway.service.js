const Catway = require('../models/Catway');

exports.createCatway = data => Catway.create(data);
exports.getAllCatways = () => Catway.find();
exports.getCatwayById = id => Catway.findById(id);
exports.updateCatwayState = (id, state) => Catway.findByIdAndUpdate(id, { catwayState: state }, { new: true });
exports.deleteCatway = id => Catway.findByIdAndDelete(id);