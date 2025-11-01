const express = require('express');

const app=express();


//ab+c   //abbbbbbbbc
//use+r   // e is optional
//a(cc)?d  // cc is optional now 


app.get('/user/:userId/:name/:password',(req,res)=>{
    console.log(req.params);
    res.send({firstName:"Rutwik",lastName :"Sindkar"});
    
})

// app.get('/use?r',(req,res)=>{
//     res.send("Heyyyy")
// })

// app.post('/user',(req,res)=>{
// res.send("oooooo")
// })


// app.delete('/user',(req,res)=>{
// res.send("deleted")
// })

// app.use('/hello',(req,res)=>{
//     res.send("Hello from serverr")
// });




app.listen(3000,()=>{
    console.log("server con");
    
})