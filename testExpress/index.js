const express = require('express')
const res = require('express/lib/response')

const app = express()

app.get('/',(req,res)=>{

    res.send('Hello World,Welcome')

})
app.get('/first',(req,res)=>{

    res.send('first page')

})
app.get('/user/:userID/books/:bookID',(req,res)=>{
    console.log(req.params.userID)
    res.send(req.params)

})
app.get('/flights/:from-:to', (req,res) =>{
    res.send(req.params)
})
app.listen(3000,()=>{
    console.log("Open port 3000")
})