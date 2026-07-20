import { Router } from "express";
import upload from "../../middleware/upload.middleware";
import * as admissionController from "./admission.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/admin",
  admissionController.getAdminAdmissions
);

router.post(
  "/admin",
  upload.single("pdf"),
  admissionController.createAdmission
);

router.put(
  "/admin/:id",
  upload.single("pdf"),
  admissionController.updateAdmission
);

router.delete(
  "/admin/:id",
  admissionController.deleteAdmission
);

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  admissionController.getAdmissions
);

router.get( 
  "/:id",
  admissionController.getAdmissionById
);

export default router;