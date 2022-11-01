const express = require('express');
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const mongoose = require('mongoose')
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({ storage })

const app = express()

mongoose.connect("mongodb://localhost/images").then(() => console.log("connect to database..."))
app.use(express.static('public'))

const imageSchema = new mongoose.Schema({
    img:
    {
        data: Buffer,
        contentType: String
    }
});
const Image = mongoose.model("image", imageSchema)
app.post('/img',upload.single('img')  , async (req ,res ,next) => {
    console.log("post")
    if(!req.file) {
        console.log("req" )
        return res.status(400).send("No file found")
    }
    console.log(req.file)
    const image = new Image({
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    })
    try{
        await image.save()
        res.send(image)
    }
    catch(err){
        console.log(err)
    }
        
  
    res.end()
})

app.get('/img', async (req, res) => {
    const image = await Image.find({});
    if(image.length == 0) return res.status(404).send("no images found...")
    res.send(image)
});
app.listen(3000 , () => console.log("listen"))