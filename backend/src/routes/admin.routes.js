import { Router } from "express";
import { updatePath, updateModule } from "../controllers/admin.controller.js";

const router = Router();

router.put("/admin/updatepath", updatePath);
router.put("/admin/updatemodule", updateModule);

export default router;
