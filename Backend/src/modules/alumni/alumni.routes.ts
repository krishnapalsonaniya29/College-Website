import { Router } from "express";
import upload from "../../middleware/upload.middleware";
import * as alumniController from "./alumni.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/admin",
  alumniController.getAdminAlumni
);

router.post(
  "/admin",
  upload.single("photo"),
  alumniController.createAlumni
);

router.put(
  "/admin/:id",
  upload.single("photo"),
  alumniController.updateAlumni
);

router.delete(
  "/admin/:id",
  alumniController.deleteAlumni
);

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  alumniController.getAlumni
);

router.get(
  "/:id",
  alumniController.getAlumniById
);

export default router;