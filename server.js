const express =require("express")
const path = require("path")
const fs = require("fs")
const cors = require("cors")
const post_routes = require("./routes/post_routes")
require("dotenv").config()


const app = express()
const PORT = process.env.PORT

//midleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static(path.join(__dirname, "public/")))


//routes
app.use("/api", post_routes)


//listener
app.listen(PORT, ()=>{
    console.info("server berjalan")
})