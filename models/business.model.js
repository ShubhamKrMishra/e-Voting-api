const mongoose = require('mongoose');

const business = new mongoose.Schema({
    postedby: {
        type: String,
        require: true,
        unique: true
    },
    businessName: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    status: {
        type: Boolean,
        default: false
    },
    approve: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model("business", business)