const express = require('express');
const multer = require('multer')
//const upload = multer({ dest: 'uploads/' })

const app = express()

 app.use(express.static('public'))

app.post('/img',multer().single('img')  , (req ,res ,next) => {
    console.log("post")
    if(!req.file) {
        console.log("req" )
        return res.status(400).send("No file found")
    }
    console.log(req.file)
    if(req.file.mimetype == 'image/png') 
        console.log('img upload')
    res.end()
})


app.listen(3000 , () => console.log("listen"))