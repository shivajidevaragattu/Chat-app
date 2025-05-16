import FriendRequest from "../../models/FriendRequest"

export const outgoingFriendRequests=async (req:any,res:any)=>{
    try{
        const outgoingReqs = await FriendRequest.find({
            sender:req.user.id,
            status:"pending"
        }).populate("recipient", "name profilePic nativeLanguage learningLanguage");
        res.status(200).json({
            success:true,
            outgoingReqs
        })
    }catch(e){
        console.log("Error in outgoingFriendRequests",e);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}