const express = require('express');
const app = express()

 app.use(express.static('public'))

app.post('/img', (req ,res ) => {
    console.log("post")
    if(!req.files) {
        console.log("req" , req.fils)
        return res.status(400).send("No file found")
    }
    console.log(req.files)
    res.end()
})

app.listen(3000 , () => console.log("listen"))