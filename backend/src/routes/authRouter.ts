import express from "express";
import { protectRoute } from "../middleware/auth";
import { login } from "../controllers/auth/Login";
import { logout } from "../controllers/auth/Logout";
import { onboard } from "../controllers/auth/Onboard";
import { signup } from "../controllers/auth/Signup";

const authRouter = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.post("/onboarding", protectRoute, onboard);

authRouter.get("/me", protectRoute, (req: any, res: any) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default authRouter;
