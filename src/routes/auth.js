const express = require('express')
const {validateSignUpData} = require("../utils/validation")
const AuthRouter = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');

AuthRouter.post("/signup", async (req, res) => {
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

AuthRouter.post("/login",async(req,res)=>{
  try{

const{emailId,password}= req.body;
const user =  await User.findOne({emailId:emailId});

if(!user){
  throw new Error("Invalid credentials")
}
const ispasswordVaid = await bcrypt.compare(password,user.password);

if(ispasswordVaid){

const token = await user.getJWT();


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


module.exports = AuthRouter;