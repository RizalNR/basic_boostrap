const multer = require("multer")
const path = require("path")

//definisi storage untuk upload 
const upload_storage = multer.diskStorage({
    filename : (req,file,cb)=>{
        cb(null,file.fieldname + "_" + Date.now() + "."  + file.mimetype.split("/")[1])
    },
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname, "../public/upload"))
    }
})

//midleware upload
const upload_middleware = multer({storage : upload_storage})

module.exports = upload_middleware