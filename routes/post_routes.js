const express = require("express")
const path = require("path")
const fs = require("fs")
const upload_middleware = require("../libs/upload_services")
const conn = require("../prisma/conn")
const { send } = require("process")
require("dotenv").config()
const moment = require("moment")

const post_routes = express.Router()

//create post
post_routes.post("/post_create", upload_middleware.single("photos") ,async(req,res)=>{
    try {
        const file = await req.file
        const {title, author, content} =await req.body
        const createPost = await conn.post.create({
            data : {
                title : title,
                author : author,
                content : content,
                filelocation : `/upload/${file.filename}`
            }
        })

        res.redirect("/?success=true")

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
})

post_routes.get("/post_read", async(req,res)=>{
    try {
        const result = await conn.post.findMany({
            orderBy : {
                createdAt : "desc"
            }
        })
        res.status(200).json({
            success : true,
            query : result,

        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })  
    }
})

module.exports = post_routes