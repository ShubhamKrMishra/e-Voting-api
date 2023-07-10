const business = require("../models/business.model");

const AddBusiness = async (req, res) => {
    try {
        let { postedby, businessName, description } = req.body
        if (!postedby || !businessName || !description) {
            return res.status(400).json({ success: false, message: "postedby, businessName, description are required" })
        }

        // create
        const data = await business.create({ postedby, businessName, description })
        return res.status(200).json({ success: true, message: data })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}

const getBusiness = async (req, res) => {
    try {
        const data = await business.find().populate('postedby', "_id name dp").select("-__v")
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(500).json({ success: false, error: "server error" })
    }
}


const getBusinessDataById = async (req, res) => {
    try {
        const { postedby } = req.query

        const data = await business.find({ postedby }).select("_id postedby businessName description status").limit(20)
        res.status(200).json({ success: true, data })
        console.log(data);
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" })
    }
}


const uploadBusiness = async (req, res) => {
    try {
        const { cardkey, description, validupto } = req.body;
        if (!cardkey && !description && !validupto) {
            return res.status(404).json({ success: false, message: "provide cardkey description and validupto" })
        }
        let data
        if (cardkey && description && validupto) {
            data = await post.create({ cardkey, description, validupto, postedby: req.userid })
        } else {
            return res.status(500).json({ success: false, message: "provide cardkey description and validupto are faild" })
        }
        return res.status(200).json({ success: true, data })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}

const updateApprove =async (req, res) => {
    try{
        const {id:taskID}=req.params;
        const task=await business.findOneAndUpdate({_id:taskID},req.body)
        if(!task){
            return res.status(400).json({ success: false, message: "Incorrect id" })
        }
        res.status(200).json({task})
    }catch(error){
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}

const deleteBusinessById = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await business.findOneAndDelete({ _id: taskID })
        if (!task) {
            return res.status(400).json({ success: false, message: "Incorrect id" })
        }
        res.status(200).json({ task })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}


const getBusinessByIdFor = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await business.findOne({ _id: taskID });
        if (!task) {
            return res.status(400).json({ success: false, message: "Incorrect id" })
        }
        res.send(task)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }

}

module.exports = {
    AddBusiness,
    getBusiness,
    uploadBusiness,
    getBusinessDataById,
    updateApprove,
    deleteBusinessById,
    getBusinessByIdFor

}