import FriendRequest from "../../models/FriendRequest";

export const getFriendRequests = async (req: any, res: any) => {
    try{
        const pendingReqs =await FriendRequest.find({
            recipient: req.user.id,
            status:"pending"
        }).populate("sender","name profilePic nativeLanguage learningLanguage")

        const acceptedReqs =await FriendRequest.find({
            recipient: req.user.id,
            status:"accepted"
        }).populate("recipient","name profilePic")
        res.status(200).json({
            success: true,
            pendingReqs,
            acceptedReqs
        })
    }
    catch(e){
        console.log("error in getting friend requests", e);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}