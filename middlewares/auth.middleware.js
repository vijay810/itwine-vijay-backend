const authService = require('../services/auth.service');

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = await authService.verifyToken(token);

        req.user = decoded;  // Attaching the decoded user info to the request
        next();  // Proceed to the next middleware/route handler
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
};

module.exports = protect;
