const user = require("../models/user.model");
const nodemailer = require("nodemailer");
const nodemaler = require("nodemailer")
const otpModal = require("../models/otp.model");
const jwt = require('jsonwebtoken');
const UserData = async (req, res) => {
    try {
        let { userID, name, decription, phone, email, businessID, businessName } = req.body
        if (!userID || !name || !decription || !phone || !email || !businessID || !businessName) {
            return res.status(400).json({ success: false, message: "userID, name, decription, phone, email, businessID businessName are required" })
        }
        // create
        const data = await user.create({ userID, name, decription, phone, email, businessID, businessName });
        // sendOtp(req, res, data, "created");
        return res.status(200).json({ success: true, message: data })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}

const UserLogin = async (req, res) => {
    try {
        let { email, userID } = req.body;
        if (!email || !userID) {
            return res.status(400).json({ success: false, message: "email ,password are required" })
        }

        const data = await user.findOne({ email, userID})
        if (!data) {
            return res.status(500).json({ success: false, message: "user don't exist with this Email number" })
        }
        const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET);
        return res.status(200).json({ success: true, data: { id: data._id, phone: data.phone, email: data.email, name: data.name, businessID: data.businessID,userID:data.userID }, token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}


const getUserData = async (req, res) => {
    try {
        const data = await user.find().populate("_id name").select("-__v")
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(500).json({ success: false, error: "server error" })
    }
}

const sendMail = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = await nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'lizzie.howe@ethereal.email',
            pass: 'rmCRfHJSp7VFge7WKf'
        },
    });
    let info = await transporter.sendMail({
        from: '"Danish Ansari 👻" <dsdanishansari1117@gmail.com>', // sender address
        to: "ddanish1928@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
}



const sendOtp = async (req, res) => {
    try {
        let { userID, email, date } = req.body
        if (!email || !userID) {
            return res.status(400).json({ success: false, message: " email are required" })
        }
        // create random otp
        const otp = Math.floor(100000 + Math.random() * 900000);
        // update in db
        const otpObj = await otpModal.updateOne({ email: email }, { otp, userid: userID, email: email }, { upsert: true })
        // send
        var transport = nodemaler.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'shubhammishra2272@gmail.com',
                pass: 'rvezpvndyhtmpmab'
            }
        })
        var mailOptions = {
            from: 'shubhammishra2272@gmail.com',
            to: `${email}`,
            subject: 'From E-voting',
            html: `<P>Date of Voting :- ${date}</p><br></br><p>Click <a href="http://localhost:3000/sessions/recover/">here</a> to Vote</p>`
        }
        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                // console.log("mail has been send", info.response);
                return res.status(200).json({ success: true, message: "otp send" })

            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}

const varifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body
        console.log(req.body.email);
        if (!email || !otp) {
            return res.status(400).json({ success: false, message: "Email id and otp is required" })
        }
        // if (email) {
        //     return res.status(400).json({ success: false, message: "invalid email Id (NaN)" })
        // }
        if (isNaN(otp)) {
            return res.status(400).json({ success: false, message: "invalid otp (NaN)" })
        }
        if (otp.toString().length !== 6) {
            return res.status(400).json({ success: false, message: "otp is invalid ( 6 digit otp)" })
        }

        const validOtp = await otpModal.findOne({ email, otp }).populate("userid")
        if (validOtp) {
            // send token
            await user.findByIdAndUpdate(validOtp.userid._id, { accountCreated: true })
            const token = jwt.sign({ id: validOtp.userid._id }, process.env.JWT_SECRET);
            //    delete otp
            await otpModal.findByIdAndDelete(validOtp._id)
            return res.status(200).json({ success: true, data: { id: validOtp.userid._id, email: validOtp.email, name: validOtp.userid.name, dp: validOtp.userid.dp }, token })
        }

        return res.status(400).json({ success: false, message: "wrong otp or Email number" })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}


const updateStatus =async (req, res) => {
    try{
        const {id:taskID}=req.params;
        const task=await user.findOneAndUpdate({_id:taskID},req.body)
        if(!task){
            return res.status(400).json({ success: false, message: "Incorrect id" })
        }
        res.status(200).json({task})
    }catch(error){
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}




module.exports = {
    UserData,
    getUserData,
    sendMail,
    sendOtp,
    UserLogin,
    updateStatus
}