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
const { adminauth, userauth } = require('./Middlewares/auth'); 
require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation")
const connectDB = require('./config/database');
const bcrypt = require('bcrypt');

const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const {} =  require('./Middlewares/auth')

app.use(express.json());//middle ware activated for all routes

app.use(cookieParser())


connectDB();

app.post("/signup", async (req, res) => {
  try {

validateSignUpData(req);
const{firstName,lastName,emailId , password} = req.body;

const passwordHash = await bcrypt.hash(password,10);
console.log(passwordHash);


    const user = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
    });

    await user.save();
    console.log("User added successfully");

    res.send("User added successfully");
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).send("Errro "+err.message);
  }
});


//login

app.post("/login",async(req,res)=>{
  try{

const{emailId,password}= req.body;
const user =  await User.findOne({emailId:emailId});

if(!user){
  throw new Error("Invalid credentials")
}
const ispasswordVaid = await bcrypt.compare(password,user.password);

if(ispasswordVaid){

const token = await jwt.sign({_id:user._id},"DEV@Tinder@123",{
  expiresIn:"1d",
})

console.log(token);

res.cookie("token",token,{
  httpOnly:true,
  secure:false,
})

  res.send("Login successfully")
}else{
  throw new Error("Invalid credentials")
}
  }catch (err) {
    console.error("Error :", err);
    res.status(500).send("Errro "+err.message);
  }
})



app.get("/profile",userauth ,async(req,res)=>{


try{

  const user = req.user;

  res.send(user)
}catch(err){
res.status(400).send("something went wrong")
}
})


app.post("/sendConnectionRequest",userauth , async(req,res)=>{
  console.log("sending connection request");
  res.send(user.firstName+"Connection request sent")
})



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
