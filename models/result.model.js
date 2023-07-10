const mongoose = require('mongoose');

const result = new mongoose.Schema({

    votingID: {
        type: String,
        require: true
    },
    candidate: {
        type: Array,
        require: true
    },
    voterID: {
        type: Array,
        default: [0]
    }
})

module.exports = mongoose.model("result", result)