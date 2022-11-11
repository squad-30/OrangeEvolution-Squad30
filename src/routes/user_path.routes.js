import { Router } from "express";
import { UserPathController } from "../controllers/user_path.controller.js";

const userPathRouter = Router();

userPathRouter.post("/api/user_path/", UserPathController.insertUserPath);

export default userPathRouter;
