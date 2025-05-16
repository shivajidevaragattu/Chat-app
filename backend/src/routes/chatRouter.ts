import express from "express";
import { protectRoute } from "../middleware/auth";
import { getStreamToken } from "../controllers/chat/getStreamToken";

const chatRouter = express.Router();
chatRouter.get("/token", protectRoute, getStreamToken);
export default chatRouter;
