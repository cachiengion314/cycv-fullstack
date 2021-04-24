const express = require(`express`)
const dotenv = require(`dotenv`)
const morgan = require(`morgan`)
const path = require(`path`)
const Router = require(`./routes/router`)
const connectDB = require(`./database/connection`)
const app = express();
const cors = require('cors')
dotenv.config()
app.use(morgan(`tiny`))
// database
connectDB()
// body parser
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: "2mb" }))

// router
app.use(`/`, Router);
app.get(`/*`, (req, res) => {
    res.send(`Welcome to create-your-cv backend site`)
});
// listen
const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
    console.log(`server start at:`, PORT)
})