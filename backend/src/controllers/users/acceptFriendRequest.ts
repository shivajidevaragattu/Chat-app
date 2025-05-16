import FriendRequest from "../../models/FriendRequest";
import User from "../../models/User";

export const acceptFriendRequest = async (req: any, res: any) => {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      res.status(404).json({
        success: false,
        message: "Friend request not found",
      });
    }
    if (friendRequest?.recipient.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to accept this friend request",
      });
    }
    (friendRequest as any).status = "accepted";
    await (friendRequest as any).save();

    await User.findByIdAndUpdate(friendRequest?.sender, {
      $addToSet: { friends: friendRequest?.recipient },
    });
    await User.findByIdAndUpdate(friendRequest?.recipient, {
      $addToSet: { friends: friendRequest?.sender },
    });
  } catch (e) {
    console.log("error in accepting friend request", e);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
