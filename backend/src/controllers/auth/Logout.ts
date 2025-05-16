import User from "../../models/User";
import jwt from "jsonwebtoken";

export const logout = async (req: any, res: any) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (err) {
    console.log(`Error in logout: ${err}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};