import { Router } from "express";
import { UserContentController } from "../controllers/user_content.controller.js";

const userContentRouter = Router();

userContentRouter.put(
  "/api/user_content/",
  UserContentController.updateUserContentStatus
);

export default userContentRouter;
