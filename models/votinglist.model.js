const mongoose = require('mongoose');

const votinglist = new mongoose.Schema({
    votingname: {
        type: String,
        require: true
    },
    candidate: {
        type: String,
        require: true
    },
    noofuser: {
        type: Number,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    selected: {
        type: String,
    },
    voterId: {
        type: Array,
        require:true
    },
    businessID: {
        type: String,
        require: true
    },
    start: {
        type: String,
        default: "start"
    },
})

module.exports = mongoose.model("votinglist", votinglist)