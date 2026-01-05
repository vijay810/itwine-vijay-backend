
const Client = require('../models/Clients.model');

exports.create = (data) => Client.create(data);
exports.getAll = () => Client.find().sort({ _id: -1 });
exports.getById = (id) => Client.findById(id);
exports.update = (id, data) => Client.findByIdAndUpdate(id, data, { new: true });
exports.remove = (id) => Client.findByIdAndDelete(id);
