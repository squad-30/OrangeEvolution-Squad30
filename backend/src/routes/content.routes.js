import { Router } from "express";
import { ContentController } from "../controllers/content.controller.js";

const router = Router();

router.get("/api/content/", ContentController.getContent);
router.post("/api/content/", ContentController.insertContent);
router.put("/api/content/", ContentController.updateContent);
router.delete("/api/content/", ContentController.deleteContent);

export default router;
