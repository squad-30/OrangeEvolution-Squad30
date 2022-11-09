import { Router } from "express";
import { ModuleController } from "../controllers/module.controller.js";

const moduleRouter = Router();

moduleRouter.post("/insertmodule", ModuleController.insertModule);
moduleRouter.put("/updatemodule", ModuleController.updateModule);
moduleRouter.delete("/deletemodule", ModuleController.deleteModule);

export default moduleRouter;
