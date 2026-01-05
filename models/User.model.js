const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mob: {
        type: Number,
        required: true
    },
    caddress: {
        type: String,
        required: true
    },
    paddress: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    uname: {
        type: String,
        required: true
    },
    dep:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    role: { type: Number, required: true },

}, {
    collection: 'users'
})
module.exports = mongoose.model('User', UserSchema);