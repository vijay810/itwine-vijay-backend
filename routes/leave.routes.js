const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leave.controller');
const protect = require('../middlewares/auth.middleware');

// Create leave (Employee)
router.post('/', protect, leaveController.createLeave);

// Get all leaves (Admin)
router.get('/', protect, leaveController.getAllLeaves);

// Get leaves of a specific user (Employee)
router.get('/user/:userId', protect, leaveController.getUserLeaves);

// Update leave status (Admin)
router.put('/update-status/:id', protect, leaveController.updateLeaveStatus);

module.exports = router;
