import { Router } from "express";

import upload from "../../middleware/upload.middleware";
import * as aboutController from "./about.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Get About Page Data
router.get("/", aboutController.getAbout);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Update About Page
router.put(
  "/admin",
  upload.single("principalPhoto"),
  aboutController.updateAbout
);

export default router;