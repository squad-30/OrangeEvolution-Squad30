import { Router } from "express";
import { ContentController } from "../controllers/content.controller.js";

const contentRouter = Router();

contentRouter.get("/api/content/:path_id", ContentController.getContent);

contentRouter.get("/api/content/:path_id", ContentController.getContent);
contentRouter.get("/api/content/", ContentController.getContentById);
contentRouter.post("/api/content/", ContentController.insertContent);
contentRouter.put("/api/content/", ContentController.updateContent);
contentRouter.delete("/api/content/", ContentController.deleteContent);

export default contentRouter;
