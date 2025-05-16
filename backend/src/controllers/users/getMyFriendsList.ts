import User from "../../models/User";

const getMyFriends = async (req:any, res:any)=>{
    try{
        const user=await User.findById(req.user.id).select("friends").populate("friends","name profilePic, nativeLanguage,learnignLanguage");
        res.status(200).json(user?.friends)
    }catch(e){

    }
}
export default getMyFriends;