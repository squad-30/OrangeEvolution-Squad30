import { Router } from "express";
import { ContentController } from "../controllers/content.controller.js";

const router = Router();

router.get("/getcontent/", ContentController.getContent);
router.post("/insertcontent", ContentController.insertContent);
router.put("/updatecontent", ContentController.updateContent);
router.delete("/deletecontent", ContentController.deleteContent);

export default router;
