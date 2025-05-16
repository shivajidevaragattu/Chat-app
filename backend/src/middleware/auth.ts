import jwt,{JwtPayload} from "jsonwebtoken";
import User from "../models/User";
export const protectRoute = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - no token provided",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized - invalid token",
      });
    }
    const user = await User.findById((decoded as JwtPayload).userId).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized - user not found",
      });
    }
    req.user = user;
    next();
  } catch (e) {
    console.log("Error in protectRoute middleware", e);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
