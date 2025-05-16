import { generateStreamToken } from "../../lib/stream";

export const getStreamToken = async (req: any, res: any) => {
try{
    const token = generateStreamToken(req.user.id);
    res.status(200).json({
        success: true,
        token,
    });
}catch(e){
    console.log("Error in getStreamToken",e);
    res.status(500).json({
        success:false,
        message:"Internal server error"
    })
}
}