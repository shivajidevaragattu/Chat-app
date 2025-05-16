import { upsertStreamUser } from "../../lib/stream";
import User from "../../models/User";
import jwt from "jsonwebtoken";

export const signup = async (req: any, res: any) => {
      const { name, email, password } = req.body;
      try {
        if (!email || !name || !password) {
          return res.status(400).json({
            message: "All fields are required",
          });
        }
        if (password.length < 8) {
          return res.status(400).json({
            message: "Password must be at least 8 characters long",
          });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
          return res.status(400).json({ message: "Invalid email format" });
        }
        const existingUser = await User.find({ email });
        if (existingUser.length > 0) {
          return res.status(400).json({
            message: "Email already exists",
          });
        }
        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
        const newUser = new User({
          name,
          email,
          password,
          profilePic: randomAvatar,
        });
        await newUser.save();
        //create the user in stream as well
        try {
          await upsertStreamUser({
            id: newUser._id.toString(),
            name: newUser.name,
            image: newUser.profilePic || "",
          });
          console.log(`Stream user created for ${newUser.name}`);
        } catch (e) {
          console.log(`Error creating stream user for ${newUser.name}: ${e}`);
        }

        const token = jwt.sign(
          { userId: newUser._id },
          process.env.JWT_SECRET_KEY as string,
          { expiresIn: "1d" }
        );
        res.cookie("jwt", token, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        });
        return res.status(201).json({
          success: true,
          user: newUser,
        });
      } catch (e) {
        console.log(`Error in signup: ${e}`);
        return res.status(500).json({
          message: "Error occured while siging up",
        });
      }
}