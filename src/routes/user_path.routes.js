import { Router } from "express";
import { UserPathController } from "../controllers/user_path.controller.js";

const userPathRouter = Router();

userPathRouter.post("/api/user_path/", UserPathController.insertUserPath);
userPathRouter.get("/api/user_path/:user_id", UserPathController.getUserPaths);

export default userPathRouter;
