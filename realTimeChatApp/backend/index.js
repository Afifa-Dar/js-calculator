const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const $ = require('jquery')

const app = express()

const msgs = []

const getMsgs = () => Array.from(msgs)

app.use(express.json())
app.use(express.static('../frontend'))
app.use(cors())

app.get('/msg' , ( req  ,res ) => {
    res.json(getMsgs())
})

 
app.post('/msg' , ( req , res ) => {
    msgs.push({ 
        msg : req.body.msg , 
        user : req.body.user
    })
    console.log("post : "+msgs)

})
app.listen(3000 , () => console.log("listen at 3000 ..."))

