// models/Counter.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let counterSchema = new Schema({
    collectionName: {
        type: String,
        required: true,
        unique: true,
    },
    sequenceValue: {
        type: Number,
        required: true,
        default: 0,  // Start at 0, increments on each new user
    },
});

module.exports = mongoose.model('Counter', counterSchema);
