import mongoose from "mongoose";

const FriendRequestSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status:{
    type:["pending","accepted"],
    default:"pending"
  }
},
{
    timestamps:true
});

const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);
export default FriendRequest;