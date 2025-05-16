import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db";
import userRouter from "./routes/userRouter";
import chatRouter from "./routes/chatRouter";

const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);-
app.use("/api/users", userRouter);
app.use("/api/chat", chatRouter)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
