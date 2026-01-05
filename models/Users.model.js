const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema(
    {
        user_id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        mob: { type: String, required: true },
        password: { type: String, required: true },
        status: {type: String, required: true},
        role: { type: Number, required: true },
    });

module.exports = mongoose.model('Users', UsersSchema);
