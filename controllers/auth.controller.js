const admin = require("../models/admin.model")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const nodemaler = require("nodemailer")

const springedge = require('springedge');

const signup = async (req, res) => {
    try {
        let { name, email, phone, password } = req.body
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ success: false, message: "name, email ,phone,password are required" })
        }
        if (isNaN(phone)) {
            return res.status(400).json({ success: false, message: "invalid mobile number (NaN)" })
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "password must be greater than 7 digit" })
        }
        if (phone.toString().length === 10) {
            const varify = await admin.findOne({ phone })
            // return res.json({varify});
            if (varify) {
                if (varify.accountCreated) {
                    return res.status(401).json({ success: false, message: "User already exists" })
                } else {
                    // update
                    password = bcrypt.hashSync(password, 10);
                    const data = await admin.findByIdAndUpdate(varify._id, { name, email, phone, password }, { new: true })
                    // sendOtp(req, res, data, "updated")
                    return res.status(200).json({ success: true, message: data })

                }
            } else {
                // create
                password = bcrypt.hashSync(password, 10);
                const data = await admin.create({ name, email, phone, password })
                // sendOtp(req, res, data, "created")
                return res.status(200).json({ success: true, message: data })

            }
        } else {
            return res.status(400).json({ success: false, message: "invalid mobile number" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "email ,password are required" })
        }

        const data = await admin.findOne({ email, accountCreated: true })
        if (!data) {
            return res.status(500).json({ success: false, message: "user don't exist with this Email number" })
        }
        if (!bcrypt.compareSync(password, data.password)) {
            return res.status(500).json({ success: false, message: "wrong password" })
        }
        const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET);
        return res.status(200).json({ success: true, data: { id: data._id, phone: data.phone, email: data.email, name: data.name, userType: data.userType }, token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}



module.exports = {
    signup,
    login,
}