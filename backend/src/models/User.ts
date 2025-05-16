import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Document } from "mongoose";

export interface UserDocument extends Document {
  password: string;
  matchPassword(userPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    bio: { type: String, default: "" },
    profilePic: { type: String, default: "" },
    nativeLanguage: { type: String, default: "" },
    learningLanguage: { type: String, default: "" },
    location: { type: String, default: "" },
    isOnboarded: { type: Boolean, default: false },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

userSchema.methods.matchPassword=async function (this:UserDocument,userPassword: string):Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
}

const User = mongoose.model("User", userSchema);
export default User;
