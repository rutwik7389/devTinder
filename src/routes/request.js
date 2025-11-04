const express = require('express')

const requestRouter = express.Router();
const {  userauth } = require('../Middlewares/auth'); 
const ConnectionRequestModel = require('../models/connectionRequest');
const connectionRequestModel = require('../models/connectionRequest');

requestRouter.post("/request/send/:status/:touserId",userauth , async(req,res)=>{


try{
 const fromUserId = req.user._id;
const toUserId = req.params.touserId;
const status = req.params.status;

const allowedStatus = ["ignored", "interested"];


if(!allowedStatus.includes(status)){
  return res.status(400).json({message:"Invalid status type: "+status})
}

const existingConnectionRequest = await connectionRequestModel.findOne({
  $or:[
    { fromUserId,toUserId},
    {fromUserId:toUserId,toUserId:fromUserId}
  ],
})

if(existingConnectionRequest){
  return res.status(400).send({message:"Connection request already made"})
}

const connectionRequest = new connectionRequestModel({
  fromUserId,toUserId,status,
})


const data = await connectionRequest.save();

res.json({
  message:"Connection req sent successfully",
  data,
})



}catch(err){
  res.status(400).send("Error"+err.message)
}



})



requestRouter.post("/request/review/:status/:requestId", userauth, async (req, res) => {



try{
const loggedInUser = req.user;
const {status,requestId} = req.params;
const allowedStatus = ["accepted","rejected"];


if(!allowedStatus.includes(status)){
  return res.status(400).send({message:" status not allowed"})
}


const connectionRequest = await connectionRequestModel.findOne({
  _id:requestId,
  toUserId:loggedInUser._id,
  status:"intrested",

});

if(!connectionRequest){
  return res.status(404).json({message:"connection request not found"})
}

connectionRequest.status = status;

const data = await connectionRequest.save();

res.json({message:"Connection request "+status,data})

}catch(err){
  res.status(400).send("Error"+err.message)
}

})




module.exports = requestRouter;