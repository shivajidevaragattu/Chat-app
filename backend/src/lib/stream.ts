import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY as string;
const apiSecret = process.env.STREAM_API_SECRET as string;

if (!apiKey || !apiSecret) {
  console.error("Stream API key or secret is not defined");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData: any) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting stream user", error);
  }
};

export const generateStreamToken = (userId: any) => {
  try{
    const userIdStr = userId.toString(); 
    return streamClient.createToken(userIdStr);
  }catch(e){
    console.log("Error in generateStreamToken",e);
  }
};
