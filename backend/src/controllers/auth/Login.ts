import User from "../../models/User";
import jwt from "jsonwebtoken";

export const login = async (req: any, res: any) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
      const isPassWordValid = await(user as any).matchPassword(password);
      if (!isPassWordValid) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );
      res.cookie("jwt", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: user,
      });
    } catch (err) {
      console.log(`Error in login: ${err}`);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
}