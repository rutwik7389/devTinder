const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    toUserId:{
         type: mongoose.Schema.Types.ObjectId,
         ref:"User",
       required:true,
        },
    status:{
        type:String,
           required:true,
        enum:{
            values:["ignored","intrested","accepted","rejected"],
            message:'{VALUE} is incorrect status type'
        }

    }
},{
timestamps:true,
}
)

const connectionRequestModel =  new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema

)

module.exports = connectionRequestModel