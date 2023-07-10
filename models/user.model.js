const mongoose = require('mongoose');

const user = new mongoose.Schema({
    userID: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    decription: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    status: {
        type: Boolean,
        default: false
    },
    businessID: {
        type: String,
        require: true
    },
    businessName: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("user", user)