const mongoose = require('mongoose');

const client = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    business: {
        type: Array,
        require: true
    },
    userType: {
        type: String,
        default: "Client"
    }
})

module.exports = mongoose.model("client", client)