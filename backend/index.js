const express = require(`express`)
const dotenv = require(`dotenv`)
const morgan = require(`morgan`)
const http = require("http")
const socketIo = require("socket.io")
const Router = require(`./routes/router`)
const connectDB = require(`./database/connection`)
const app = express();
const cors = require('cors')
dotenv.config()
app.use(cors())
app.use(morgan(':date[clf] ":method :url"'))
// database
connectDB()
// body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: "2mb" }))
// router
app.use(`/`, Router);
app.get(`/*`, (req, res) => {
    res.send(`Welcome to create-your-cv backend site`)
})
/////////// socket.io
const server = http.createServer(app)
const io = socketIo(server)
io.on("connection", (socket) => {
    console.log("New client has just connected")

    socket.on(`comment-sent`, (data) => {
        io.emit("commented-notify", data)
    })

    socket.on("disconnect", () => {
        console.log("One of client has just disconnected")
    })
})
// listen
const PORT = process.env.PORT || 3005
server.listen(PORT, () => {
    console.log(`server listen at:`, PORT)
})