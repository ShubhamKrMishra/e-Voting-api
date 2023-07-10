const express = require("express")
const route = express.Router()
const { AddBusiness, getBusiness, getBusinessDataById, updateApprove, deleteBusinessById, getBusinessByIdFor } = require("../controllers/business.controller")

route.post("/business", AddBusiness)
route.get("/getbusiness", getBusiness)
route.get("/getBusinessdatabyid", getBusinessDataById)
route.patch("/updateApprove/:id", updateApprove)
route.delete("/deleteBusinessById/:id", deleteBusinessById)
route.get("/getBusinessByIdFor/:id", getBusinessByIdFor)

module.exports = route