const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let teamsSchema = new Schema({

    teamname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: true
    },
    status: {
        type: Number,
        required: true
    },

}, {
    collection: 'teams'
})
module.exports = mongoose.model('teams', teamsSchema)