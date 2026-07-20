import { Router } from "express";
import upload from "../../middleware/upload.middleware";
import * as syllabusController from "./syllabus.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/admin",
  syllabusController.getAdminSyllabus
);

router.post(
  "/admin",
  upload.single("pdf"),
  syllabusController.createSyllabus
);

router.put(
  "/admin/:id",
  upload.single("pdf"),
  syllabusController.updateSyllabus
);

router.delete(
  "/admin/:id",
  syllabusController.deleteSyllabus
);

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  syllabusController.getSyllabus
);

router.get(
  "/:id",
  syllabusController.getSyllabusById
);

export default router;