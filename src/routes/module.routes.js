import { Router } from "express";
import { ModuleController } from "../controllers/module.controller.js";

const moduleRouter = Router();

moduleRouter.post("/api/module/", ModuleController.insertModule);
moduleRouter.get("/api/module/:module_id", ModuleController.getModule);
moduleRouter.put("/api/module/", ModuleController.updateModule);
moduleRouter.delete("/api/module/", ModuleController.deleteModule);

export default moduleRouter;
