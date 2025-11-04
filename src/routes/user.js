const express = require('express');
const userRouter = express.Router();

const user = require("../models/user")

const {userauth} = require("../Middlewares/auth")


const ConnectionRequest = require("../models/connectionRequest")
const USER_SAFE_DATA = "firstName lastName";


userRouter.get("/user/requests/received",userauth,async (req , res)=>{
    try{
const loggedInUser = req.user;

const connectionRequests = await ConnectionRequest.find({
    toUserId:loggedInUser._id,
    status:"intrested"
}).populate("fromUserId",["firstName","lastName"]);

res.json({
    message:"Data fetch successfully",
    data:connectionRequests,
})

    }catch(err){
        req.statusCode(400).send("Error :"+err.message)
    }
})


userRouter.get("/user/connections",userauth,async(req,res)=>{

try{
const loggedInUser = req.user;

const connectionRequests = await ConnectionRequest.find({
    $or:[
        { toUserId:loggedInUser._id,status:"accepted"},
        {fromUserId:loggedInUser._id,status:"accepted"}
    ],
}).populate("fromUserId",USER_SAFE_DATA)
  .populate("toUserId",USER_SAFE_DATA)

const data = connectionRequests.map((row)=>{
    if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
        return row.toUserId;
    }
   return row.fromUserId
});
res.json({data});

}catch(err){
res.status(400).send({message:err.message})
}


})



userRouter.get("/feed",userauth,async(req,res)=>{

try{
const loggedInUser  =req.user;


const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit)|| 10;
const skip = (page-1)*limit;



const connectionRequests = await ConnectionRequest.find({
    $or:[
        {
            fromUserId:loggedInUser._id
        },
        {
            toUserId:loggedInUser._id
        }
    ],
}).select("fromUserId toUserId");

const hideUserFromFeed = new Set();

//////
connectionRequests.forEach((req)=>{
    hideUserFromFeed.add(req.fromUserId.toString());
    hideUserFromFeed.add(req.toUserId.toString());
})

    
//////
const users = await user.find({
    $and:[
      {  _id:{$nin:Array.from(hideUserFromFeed)}},
      {_id:{$ne:loggedInUser._id}}
    ],
}).select(USER_SAFE_DATA).skip(skip).limit(limit);
res.send(users);

}catch(err){
    res.status(400).send("ERROR"+err.message);

}


})









module.exports = userRouter;