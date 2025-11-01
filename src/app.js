const express = require('express');

const app = express();


//ab+c   //abbbbbbbbc
//use+r   // e is optional
//a(cc)?d  // cc is optional now 


// app.get('/user/:userId/:name/:password',(req,res)=>{
//     console.log(req.params);
//     res.send({firstName:"Rutwik",lastName :"Sindkar"});

// })

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



app.use('/user', 
    
    [(req, res, next) => {
    console.log("jjjj");
   // res.send('jjjjjn')
    next();
}, (req, res,next) => {
    //res.send("i got res back 1")
     next();
},
(req, res,next) => {
   // res.send("i got res back 22")
    next();
},
(req, res,next) => {
    //res.send("i got res back 2")
     next();
},
(req, res,next) => {
    res.send("i got res back")
     next();
},]
)




app.listen(3000, () => {
    console.log("server con");

})