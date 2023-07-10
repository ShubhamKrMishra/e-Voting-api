const client=require("../models/client.model")
const bcrypt = require("bcryptjs");


const Client = async (req, res) => {
    try {
        let { name, email, phone, gender, password,business } = req.body
        if (!name || !email || !phone || !gender || !password) {
            return res.status(400).json({ success: false, message: "name, email ,phone ,gender,password are required" })
        }
        if (isNaN(phone)) {
            return res.status(400).json({ success: false, message: "invalid mobile number (NaN)" })
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "password must be greater than 7 digit" })
        }
        if (phone.toString().length === 10) {
            const varify = await client.findOne({ phone })
            // return res.json({varify});
            if (varify) {
                if (varify.accountCreated) {
                    return res.status(401).json({ success: false, message: "User already exists" })
                } else {
                    // update
                    password = bcrypt.hashSync(password, 10);
                    const data = await client.findByIdAndUpdate(varify._id, { name, email, phone, gender, password,business }, { new: true })
                    // sendOtp(req, res, data, "updated")
                    return res.status(200).json({ success: true, message: data })

                }
            } else {
                // create
                password = bcrypt.hashSync(password, 10);
                const data = await client.create({ name, email, phone, gender, password,business })
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

module.exports = {
    Client
}