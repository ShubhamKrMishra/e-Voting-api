const result = require("../models/result.model");

const candidate = async (req, res) => {
    try {
        let { votingID, candidate } = req.body
        if (!votingID || !candidate) {
            return res.status(400).json({ success: false, message: "VotingID candidate are required" })
        }
        const data = await result.create({ votingID, candidate })
        return res.status(200).json({ success: true, message: data })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}

const updateArray = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await result.findOneAndUpdate({ votingID: taskID }, { $push: req.body })
        if (!task) {
            return res.status(400).json({ success: false, message: "Incorrect id" })
        }
        res.status(200).json({ task })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }

}

const getCandidate = async (req, res) => {
    try {
        const data = await result.find().populate('votingID', "_id candidate voterID").select("-__v")
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(500).json({ success: false, error: "server error" })
    }
}

const getCandidateById = async (req, res) => {
    try {
        const { voterId } = req.query;
        const data = await result.findOne({ voterId }).select("_id votingID candidate voterID").limit(20)
        res.status(200).json({ success: true, data })
        console.log(data);
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" })
    }
}


module.exports = {
    candidate,
    updateArray,
    getCandidate,
    getCandidateById
}