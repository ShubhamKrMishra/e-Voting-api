const express = require("express");
const route = express.Router();
const { candidate, updateArray, getCandidate,getCandidateById } = require("../controllers/result.controller");

route.post("/candidate", candidate);
route.patch("/updateArray/:id", updateArray)
route.get("/getcandidate", getCandidate)
route.get("/getCandidateById/:id", getCandidateById)

module.exports = route