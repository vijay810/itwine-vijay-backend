const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const protect = require('../middlewares/auth.middleware');  // Protect middleware to secure certain routes

// Register a new user
router.post('/register', authController.register);

// Login an existing user
router.post('/login', authController.login);

// Forgot password
router.post('/forgot-password', authController.forgotPassword);

// Verify the token (requires authentication)
router.get('/verify-token', protect, (req, res) => {
    res.status(200).json({
        status: 200,
        valid: true,
        user: req.user
    });
});

module.exports = router;
