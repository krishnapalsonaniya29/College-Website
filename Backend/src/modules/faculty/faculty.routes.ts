import { Router } from "express";
import upload from "../../middleware/upload.middleware";
import * as facultyController from "./faculty.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.get("/admin", facultyController.getAdminFaculty);

router.post(
  "/admin",
  upload.single("photo"),
  facultyController.createFaculty
);

router.put(
  "/admin/:id",
  upload.single("photo"),
  facultyController.updateFaculty
);

router.delete(
  "/admin/:id",
  facultyController.deleteFaculty
);

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/", facultyController.getFaculty);

router.get("/:id", facultyController.getFacultyById);

export default router;