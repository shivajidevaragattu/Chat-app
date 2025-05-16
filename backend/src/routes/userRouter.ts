import express from "express";
import getRecommendedUsers from "../controllers/users/getRecommendedUsers";
import getMyFriends from "../controllers/users/getMyFriendsList";
import { protectRoute } from "../middleware/auth";
import sendFriendRequest from "../controllers/users/sendFriendRequest";
import { acceptFriendRequest } from "../controllers/users/acceptFriendRequest";
import { getFriendRequests } from "../controllers/users/getFriendRequests";
import { outgoingFriendRequests } from "../controllers/users/outgoingFriendRequests";

const userRouter = express.Router();

userRouter.use(protectRoute);

userRouter.get("/", getRecommendedUsers);
userRouter.get("/frieds", getMyFriends);
userRouter.post("/friend-request/:id",sendFriendRequest)
userRouter.put("/frient-request/:id/accept",acceptFriendRequest)
userRouter.get("/friend-request",getFriendRequests);
userRouter.get("/outgoing-friend-request",outgoingFriendRequests);

export default userRouter;
