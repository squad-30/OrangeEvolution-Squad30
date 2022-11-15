import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/api/user/login", UserController.login);
userRouter.post("/api/user/", UserController.register);
userRouter.post("/api/user/token", UserController.jwtVerify);
userRouter.put("/api/user/", UserController.editProfile);
userRouter.put("/api/user/changepassword", UserController.changePassword);
userRouter.delete("/api/user/", UserController.delete);
userRouter.get("/api/user/:user_id", UserController.getUserById);

export default userRouter;
