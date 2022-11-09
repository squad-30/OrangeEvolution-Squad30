import { Router } from "express";
import { PathController } from "../controllers/path.controller.js";

const pathRouter = Router();

pathRouter.post("/insertpath", PathController.insertPath);
pathRouter.put("/updatepath", PathController.updatePath);
pathRouter.delete("/deletepath", PathController.deletePath);

export default pathRouter;
