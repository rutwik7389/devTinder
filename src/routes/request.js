const express = require('express')

const requestRouter = express.Router();
const {  userauth } = require('../Middlewares/auth'); 

requestRouter.post("/sendConnectionRequest",userauth , async(req,res)=>{
  console.log("sending connection request");
  res.send(user.firstName+"Connection request sent")
})

module.exports = requestRouter;