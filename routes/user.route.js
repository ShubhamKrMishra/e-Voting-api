const express = require("express")
const user = express.Router()
const { UserData, getUserData, sendOtp, UserLogin, updateStatus } = require("../controllers/user.controller")
user.post("/", UserData)
user.get("/getuserdata", getUserData)
user.post("/sendOtp", sendOtp)
user.post("/userlogin", UserLogin)
user.patch("/updateStatus/:id", updateStatus)
module.exports = user