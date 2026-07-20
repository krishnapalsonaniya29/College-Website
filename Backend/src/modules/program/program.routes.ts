import { Router } from "express";
import * as programController from "./program.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.get("/admin", programController.getAdminPrograms);

router.post(
  "/admin",
  programController.createProgram
);

router.put(
  "/admin/:id",
  programController.updateProgram
);

router.delete(
  "/admin/:id",
  programController.deleteProgram
);

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/", programController.getPrograms);

router.get("/:id", programController.getProgramById);

export default router;