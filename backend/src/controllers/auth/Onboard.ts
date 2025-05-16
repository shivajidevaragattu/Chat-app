import { upsertStreamUser } from "../../lib/stream";
import User from "../../models/User";

export const onboard = async (req: any, res: any) => {
  try {
    const userId = req.user._id;
    const { name, bio, nativeLanguage, learningLanguage, location } = req.body;
    if (!name || !bio || !nativeLanguage || !learningLanguage || !location) {
      return res.status(400).json({
        message: "All missing fields are required",
        missingFields: [
          !name && "name",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.name,
        image: updatedUser.profilePic || "",
      });
      console.log(
        `Stream user updated after onboarding for ${updatedUser.name}`
      );
    } catch (streamError) {
      console.log(
        `Error updating stream user during onboarding for ${updatedUser.name}: ${streamError}`
      );
    }
    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (e) {
    console.log(`Error while onboarding: ${e}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
