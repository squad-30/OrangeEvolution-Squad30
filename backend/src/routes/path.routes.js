import { Router } from "express";
import { PathController } from "../controllers/path.controller.js";

const pathRouter = Router();

pathRouter.post("/api/path/insertpath", PathController.insertPath);
pathRouter.put("/api/path/updatepath", PathController.updatePath);
pathRouter.delete("/api/path/deletepath", PathController.deletePath);

export default pathRouter;
