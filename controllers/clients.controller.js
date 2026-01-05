const service = require('../services/clients.service');

exports.create = async (req, res, next) => {
    try {
        res.json(await service.create(req.body));
    } catch (e) {
        next(e);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        res.json(await service.getAll());
    } catch (e) {
        next(e);
    }
};
