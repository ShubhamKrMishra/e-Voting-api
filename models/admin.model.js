const mongoose = require('mongoose');

const admin = new mongoose.Schema({
    userID: {
        type: String,
        require: true
    },
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
    // gender: {
    //     type: String,
    //     required: true
    // },
    password: {
        type: String,
        require: true
    },
    accountCreated: {
        type: Boolean,
        default: true
    },
    userType: {
        type: String,
        default: "Client"
    }
})

module.exports = mongoose.model("admin", admin)