const express = require("express")
const votinglist = express.Router()
const { votinglistData, getvotinglistData, getvotinglistDataById, updateVotingListStart,getvotinglistForVoterById,updateSelected } = require("../controllers/votinglist.controller")
votinglist.post("/", votinglistData)
votinglist.get("/getvotinglistdata", getvotinglistData)
votinglist.get("/getvotinglistbyid", getvotinglistDataById)
votinglist.patch("/updateVotingListStart/:id", updateVotingListStart)
votinglist.get("/getvotinglistForVoterById", getvotinglistForVoterById)
votinglist.patch("/updateSelected/:id", updateSelected)

module.exports = votinglist