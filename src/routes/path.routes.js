import { Router } from "express";
import { PathController } from "../controllers/path.controller.js";

const pathRouter = Router();

pathRouter.post("/api/path/", PathController.insertPath);
pathRouter.get("/api/path/:path_id", PathController.getPath);
pathRouter.put("/api/path/", PathController.updatePath);
pathRouter.delete("/api/path/", PathController.deletePath);

export default pathRouter;
