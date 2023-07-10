const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    otp: {
        type: Number,
        required: true
    },
    datetime: { type: Date, default: Date.now }
})
module.exports = mongoose.model("otp", schema);
