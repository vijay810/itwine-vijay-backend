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

// exports.login = async (req, res) => {
//     try {
//         const data = await authService.login(req.body);
//         res.status(200).json({
//             status: 200,
//             message: 'Login successful',
//             data
//         });
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };
exports.login = async (req, res) => {
    try {
        const data = await authService.login(req.body);

        let message = 'Login successful';

        if (data.role === 1) {
            message = 'Admin login successfully';
        } else if (data.role === 2) {
            message = 'User login successfully';
        } else if (data.role === 3) {
            message = 'Client login successfully';
        }

        res.status(200).json({
            status: 200,
            message,
            data
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.forgotPassword = async (req, res) => {
    try {
        const data = await authService.forgotPassword(req.body);

        res.status(200).json({
            status: 200,
            message: data.message
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};
