// const user = require("../models/user.model");
const votinglist = require("../models/votinglist.model");


const votinglistData = async (req, res) => {
    try {
        let { votingname, candidate, noofuser, date, selected, voterId, businessID } = req.body
        if (!votingname || !candidate || !noofuser || !date || !voterId || !businessID) {
            return res.status(400).json({ success: false, message: "votingname, candidate, noofuser, date, selected, businessID are required" })
        }
        // create
        const data = await votinglist.create({ votingname, candidate, noofuser, date, selected, voterId, businessID })
        return res.status(200).json({ success: true, message: data })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}

const getvotinglistData = async (req, res) => {
    try {
        const data = await votinglist.find().populate("_id votingname candidate noofuser date selected").select("-__v")
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(500).json({ success: false, error: "server error" })
    }
}

const getvotinglistDataById = async (req, res) => {
    try {
        const { businessID } = req.query

        const data = await votinglist.find({ businessID }).select("_id votingname candidate noofuser date selected start").limit(20)
        res.status(200).json({ success: true, data })
        console.log(data);
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" })
    }
}

const getvotinglistDataByIdOfOvert = async (req, res) => {
    try {
        const { } = req.query

        const data = await votinglist.find({ businessID }).select("_id votingname candidate noofuser date selected start").limit(20)
        res.status(200).json({ success: true, data })
        console.log(data);
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" })
    }
}

const updateVotingListStart = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await votinglist.findOneAndUpdate({ _id: taskID }, req.body)
        if (!task) {
            return res.status(400).json({ success: false, message: "Incorrect id" })
        }
        res.status(200).json({ task })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}


const getvotinglistForVoterById = async (req, res) => {
    try {
        const { voterId } = req.query;
        const data = await votinglist.find({ voterId }).select("_id votingname candidate noofuser date selected start").limit(20)
        res.status(200).json({ success: true, data })
        console.log(data);
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" })
    }
}


const updateSelected =async (req, res) => {
    try{
        const {id:taskID}=req.params;
        const task=await votinglist.findOneAndUpdate({_id:taskID},req.body)
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
    votinglistData,
    getvotinglistData,
    getvotinglistDataById,
    updateVotingListStart,
    getvotinglistDataByIdOfOvert,
    getvotinglistForVoterById,
    updateSelected
}