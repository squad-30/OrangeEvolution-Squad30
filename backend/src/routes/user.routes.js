import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/api/user/login", UserController.login);
userRouter.post("/api/user/register", UserController.register);

export default userRouter;
