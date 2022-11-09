import { Router } from "express";
import { ContentController } from "../controllers/content.controller.js";

const router = Router();

router.get("/api/content/getcontent", ContentController.getContent);
router.post("/api/content/insertcontent", ContentController.insertContent);
router.put("/api/content/updatecontent", ContentController.updateContent);
router.delete("/api/content/deletecontent", ContentController.deleteContent);

export default router;
