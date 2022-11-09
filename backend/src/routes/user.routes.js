import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/login", UserController.login);

export default userRouter;
