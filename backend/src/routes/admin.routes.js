import { Router } from "express";
import {
  updatePath,
  updateModule,
  updateContent,
  insertContent,
  insertModule,
  insertPath,
} from "../controllers/admin.controller.js";

const router = Router();

router.put("/admin/updatepath", updatePath);
router.put("/admin/updatemodule", updateModule);
router.put("/admin/updatecontent", updateContent);

router.post("/admin/insertpath", insertPath);
router.post("/admin/insertmodule", insertModule);
router.post("/admin/insertcontent", insertContent);

export default router;
