const userService = require('../services/user.service');

const userController = {

    createUser: async (req, res, next) => {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json({
                data: user,
                message: 'User added successfully!',
                status: 200
            });
        } catch (err) {
            next(err);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();
            res.json({
                data: users,
                message: 'All users fetched successfully.',
                status: 200
            });
        } catch (err) {
            next(err);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found', status: 404 });
            res.json({ data: user, message: 'User fetched successfully.', status: 200 });
        } catch (err) {
            next(err);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const updatedUser = await userService.updateUser(req.params.id, req.body);
            res.json({ data: updatedUser, message: 'User updated successfully.', status: 200 });
        } catch (err) {
            res.status(400).json({ message: err.message, status: 400 });
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            await userService.deleteUser(req.params.id);
            res.json({ message: 'User deleted successfully.', status: 200 });
        } catch (err) {
            res.status(400).json({ message: err.message, status: 400 });
        }
    }
};

module.exports = userController;
