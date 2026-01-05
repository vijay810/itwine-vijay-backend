const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({

    reason: String,

    formdate: Date,
    todate: Date,

    status: {
        type: Number,
        default: 0 // 0 Pending | 1 Rejected | 2 Approved
    },

    userId: {
        type: String,
        required: true
    }
}, { collection: 'leaves'});

module.exports = mongoose.model('leaves', leaveSchema);
