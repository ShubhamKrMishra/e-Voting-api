const express = require("express")
const route = express.Router()
const { Client } = require("../controllers/client.controller")

route.post("/client", Client)

module.exports = route