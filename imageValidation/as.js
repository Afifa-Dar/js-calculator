const express = require('express');
const app = express()

 app.use(express.static('public'))

app.post('/res.html', (req ,res ) => {
    console.log("post")
    res.send(req.body)
})

app.listen(3000 , () => console.log("listen"))