import { Router } from "express";
import { ContentController } from "../controllers/content.controller.js";
import { UserController } from "../controllers/user.controller.js";

const contentRouter = Router();

contentRouter.get(
  "/api/content/:path_id",
  ContentController.getContent
);
contentRouter.post("/api/content/", ContentController.insertContent);
contentRouter.put("/api/content/", ContentController.updateContent);
contentRouter.delete("/api/content/", ContentController.deleteContent);

export default contentRouter;
