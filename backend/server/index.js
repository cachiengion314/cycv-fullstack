const express = require(`express`)
const dotenv = require(`dotenv`)
const morgan = require(`morgan`)
const path = require(`path`)
// const Router = require(`./routes/router`)
// const connectDB = require(`./database/connection`)
const app = express()
// dotenv.config({ path: "config.env" })
app.use(morgan(`tiny`))

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: "2mb" }))

// app.use(express.static(path.join(__dirname, "..", "client", "build")))

// app.use(`/*`, express.static(path.join(__dirname, "..", "client", "build")));

const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
    console.log(`server start at:`, PORT)
})