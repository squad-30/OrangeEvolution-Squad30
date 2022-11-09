import { Router } from "express";
import {
  updatePath,
  updateModule,
  updateContent,
} from "../controllers/admin.controller.js";

const router = Router();

router.put("/admin/updatepath", updatePath);
router.put("/admin/updatemodule", updateModule);
router.put("/admin/updatecontent", updateContent);

export default router;
