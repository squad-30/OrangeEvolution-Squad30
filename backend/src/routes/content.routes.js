import { Router } from "express";
import { content } from "../controllers/content.controller.js";

const router = Router();

router.get("/content", content);

export default router;
