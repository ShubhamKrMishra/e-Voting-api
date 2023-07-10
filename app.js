const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const http = require("http")
const server = http.createServer(app)

// const orders = require("./routes/order.routes")
const auth = require("./routes/auth.route");
const client = require("./routes/client.route");
const user = require("./routes/user.route");
const business = require("./routes/business.route");
const votinglist = require("./routes/votinglist.route");
const result = require("./routes/result.routes");


const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use("/v1/auth", auth);
app.use("/v1/client", client);
app.use("/v1/business", business);
app.use("/v1/user", user);
app.use("/v1/votinglist", votinglist);
app.use("/v1/result", result);


app.get("/", (req, res) => {
    res.status(200).json({ msg: "welcome v1" })
})

const init = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.mongo_URL)
        server.listen(PORT, () => console.log('server is listening at PORT ' + PORT))
    } catch (error) {
        console.log(error)
    }
}
init()