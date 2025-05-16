import FriendRequest from "../../models/FriendRequest";
import User from "../../models/User";

const sendFriendRequest = async (req: any, res: any) => {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;
    if (myId === recipientId) {
      return res.status(400).json({
        success: false,
        message: "You cannot send friend request to yourself",
      });
    }
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({
        success: false,
        message: "Recipient not found",
      });
    }
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({
        success: false,
        message: "You are already friends with this user",
      });
    }
    const excistingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });
    if (excistingRequest) {
      return res.status(400).json({
        success: false,
        message: "Friend request already sent",
      });
    }
    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });
    await friendRequest.save();

    res.status(201).json(friendRequest);
  } catch (e) {
    console.log("error in sending friend request", e);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export default sendFriendRequest;
