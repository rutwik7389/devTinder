const express = require('express')

const profileRouter = express.Router();
const {  userauth } = require('../Middlewares/auth'); 

const {validateEditProfileData} = require('../utils/validation')

profileRouter.get("/profile/view",userauth ,async(req,res)=>{


try{

  const user = req.user;

  res.send(user)
}catch(err){
res.status(400).send("something went wrong")
}
})


profileRouter.patch("/profile/edit",userauth,async(req,res)=>{
try{

if(!validateEditProfileData(req)){
throw new Error("Invalid Edit Request")
}

const loggedInuser = req.user;



Object.keys(req.body).forEach((key)=>(loggedInuser[key]= req.body[key]));

await loggedInuser.save();

res.send("Edit was successfulyy done")
}catch(err){
  res.status(400).send("Error"+err.message)
}



})

module.exports = profileRouter;


