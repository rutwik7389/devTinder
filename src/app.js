// const express = require('express');
// const { adminauth } = require('./Middlewares/auth');

// const app = express();




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



// app.use('/user', 
    
//     [(req, res, next) => {
//     console.log("jjjj");
//    res.send('jjjjjn')
//     next();
// }, (req, res,next) => {
//     res.send("i got res back 1")
//      next();
// },
// (req, res,next) => {
//    res.send("i got res back 22")
//     next();
// },
// (req, res,next) => {
//     res.send("i got res back 2")
//      next();
// },
// (req, res,next) => {
//     res.send("i got res back")
//      next();
// },]
// )




//Middleware for authorisation check for both get data, delete user 
// check auth at each api

// app.use('/admin',adminauth)

// app.get('/admin/getalldata',(req,res)=>{
//     res.send("all data sent");
// });

// app.get('/admin/deleteuser',(req,res)=>{
//     res.send("deleted");
// });

// app.listen(3000, () => {
//     console.log("server con");

// })


// const express = require('express');
// const { adminauth , userauth} = require('./Middlewares/auth'); // ✅ Correct import
// require("./config/database")
// const app = express();

// app.use('/admin', adminauth);
// app.use('/user', userauth);


// app.get('/getuserdata',(req,res)=>{
// throw new Error("hhhhhhh")
//     res.send("userr")
// })


// app.use("/",(err,req,res,next)=>{
// if(err){
//     res.status(500).send("something went wrong")
// }
// })



// app.get('/admin/getalldata', (req, res) => {
//     res.send("all data sent");
// });

// app.get('/admin/deleteuser', (req, res) => {
//     res.send("deleted");
// });

// app.listen(3000, () => {
//     console.log("server connected");
// });






const express = require('express');

require("./config/database");
const app = express();


const connectDB = require('./config/database');


const cookieParser = require('cookie-parser')


const {} =  require('./Middlewares/auth')

app.use(express.json());//middle ware activated for all routes

app.use(cookieParser())

const AuthRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')

app.use('/',AuthRouter);
app.use('/',profileRouter)
app.use('/',requestRouter)


connectDB();












// //getallusers
// app.get("/feed",userauth ,async(req,res)=>{

//   try{
// const users = await User.find({});
// res.send(users);
//   }catch(err){
// res.status(400).send("something went wrong")
//   }
// })


// // get one user
// app.get("/user",async(req,res)=>{
// const userEmail = req.body.emailId;
//   try{
// console.log(userEmail);
// const user = await User.findOne({emailId:userEmail})
// res.send(user);
//   }catch(err){
// res.status(400).send("something went wrong")
//   }
// })


// // get user by id
// app.get("/userbyid/:id",userauth ,async(req,res)=>{
// const userId = req.params.id;
//     console.log("User ID:", userId);
//   try{

// const user = await User.findById(userId)
// res.send(user);
//   }catch(err){
// res.status(400).send("something went wrong")
//   }
// })

// //deleteuserbyid

// app.delete("/user",userauth ,async(req,res)=>{
// const userId = req.body.userId;
    
//   try{

// const user = await User.findByIdAndDelete(userId)
// res.send(" deleted successfully");
//   }catch(err){
// res.status(400).send("something went wrong")
//   }
// })


// //update user patch

// app.patch("/user",userauth , async(req,res)=>{
// const userId = req.body.userId;
//     const data = req.body;

//   try{

// await User.findByIdAndUpdate({_id:userId},data)

// res.send(" updated successfully");
//   }catch(err){
// res.status(400).send("something went wrong")
//   }

// })


app.listen(3000, () => {
  console.log("Server connected on port 3000");
});
