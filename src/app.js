const express = require('express');

const app=express();



app.get('/user',(req,res)=>{
    res.send("Heyyyy")
})

app.post('/user',(req,res)=>{
res.send("oooooo")
})


app.delete('/user',(req,res)=>{
res.send("deleted")
})

app.use('/hello',(req,res)=>{
    res.send("Hello from serverr")
});




app.listen(3000,()=>{
    console.log("server con");
    
})