import { Router } from "express";
import { ModuleController } from "../controllers/module.controller.js";

const moduleRouter = Router();

moduleRouter.post("/api/module/insertmodule", ModuleController.insertModule);
moduleRouter.put("/api/module/updatemodule", ModuleController.updateModule);
moduleRouter.delete("/api/module/deletemodule", ModuleController.deleteModule);

export default moduleRouter;
