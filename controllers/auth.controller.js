const authService = require('../services/auth.service');

exports.register = async (req, res) => {
    try {
        const data = await authService.register(req.body);
        res.status(201).json({
            status: 200,
            message: 'User registered',
            data
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const data = await authService.login(req.body);
        res.status(200).json({
            status: 200,
            message: 'Login successful',
            data
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
