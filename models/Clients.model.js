const mongoose = require('mongoose');

const ClientsSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phone: {
        type: Number,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },

}, {
    collection: 'clients'
})
module.exports = mongoose.model('Client', ClientsSchema);