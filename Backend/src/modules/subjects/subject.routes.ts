import { Router } from "express";
import * as subjectController from "./subject.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.get("/admin", subjectController.getAdminSubjects);

router.post(
  "/admin",
  subjectController.createSubject
);

router.put(
  "/admin/:id",
  subjectController.updateSubject
);

router.delete(
  "/admin/:id",
  subjectController.deleteSubject
);

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/", subjectController.getSubjects);

router.get("/:id", subjectController.getSubjectById);

export default router;