const express = require('express');

const app=express();

app.use('/hey',(req,res)=>{
    res.send("Hello from server")
});


app.use('/hello',(req,res)=>{
    res.send("Hello from serverr")
});




app.listen(3000,()=>{
    console.log("server con");
    
})