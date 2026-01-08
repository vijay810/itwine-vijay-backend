const Users = require('../models/Users.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (data) => {
    const userExists = await Users.findOne({ email: data.email });
    if (userExists) throw new Error('User already exists');

    const password = await bcrypt.hash(data.password, 10);  // Hash password before saving
    const user = await Users.create({
        ...data,
        password,
        user_id: uuidv4()  // Create unique user_id
    });

    const token = jwt.sign(
        { id: user._id, user_id: user.user_id, role: user.role },
        JWT_SECRET,
        { expiresIn: '5m' }  // Token expires in 5 minutes
    );

    return {
        token,
        name: user.name,
        role: user.role,
        user_id: user.user_id
    };
};

exports.login = async ({ email, password, role }) => {
    const user = await Users.findOne({ email });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    if (role && user.role !== Number(role)) {
        throw new Error('Role mismatch');
    }

    const token = jwt.sign(
        { id: user._id, user_id: user.user_id, name: user.name, role: user.role },
        JWT_SECRET,
        { expiresIn: '5m' }
    );

    return {
        token,
        name: user.name,
        role: user.role,
        user_id: user.user_id
    };
};

exports.forgotPassword = async ({ email, user_id, password, confirmPassword }) => {
    if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
    }

    const user = await Users.findOne({ email, user_id });
    if (!user) {
        throw new Error('Invalid email or user ID');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    return {
        message: 'Password updated successfully'
    };
};







exports.verifyToken = async (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            throw new Error('Token expired');
        }
        throw new Error('Invalid token');
    }
};
