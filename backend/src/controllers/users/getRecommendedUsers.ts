import User from "../../models/User";

const getRecommendedUsers = async (req:any, res:any) => {
    try{
        const currentUserId =req.user.id;
        const currentUser =req.user;
        const recommendedusers= await User.find({
            $and:[
                {_id:{$ne:currentUserId}},
                {$_d:{$nin:currentUser.friends}},
                {isOnboarded:true}
            ]
        })
        res.status(200).json(recommendedusers);
    }catch(e){
        console.log("error in getting recommended users",e);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
export default getRecommendedUsers;