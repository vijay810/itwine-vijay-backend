const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

function isPasswordHashed(password) {
    return /^(\$2[aby]\$)[\d]{2}\$/.test(password);
}

const userService = {

    // CREATE user
    async createUser(data) {
        const { password, ...userData } = data;

        if (!password) throw new Error('Password is required.');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ ...userData, password: hashedPassword });
        return newUser;
    },

    // GET all users
    async getAllUsers() {
        return await User.find().sort({ _id: -1 });
    },

    // GET single user
    async getUserById(id) {
        return await User.findById(id);
    },

    // UPDATE user
    async updateUser(id, data) {
        const { password } = data;

        if (password && !isPasswordHashed(password)) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });

        if (!updatedUser) throw new Error('User not found');
        return updatedUser;
    },

    // DELETE user
    async deleteUser(id) {
        const deleted = await User.findByIdAndDelete(id);
        if (!deleted) throw new Error('User not found');
        return deleted;
    }
};

module.exports = userService;
