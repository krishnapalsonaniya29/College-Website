

import { Router } from "express";

import upload from "../../middleware/upload.middleware";
import * as galleryController from "./gallery.controller";

const router = Router();



/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Get All Gallery Images (Admin)
router.get("/admin", galleryController.getAllGallery);

// Create Gallery Image
router.post(
  "/admin",
  upload.single("image"),
  galleryController.createGallery
);

// Update Gallery Image
router.put(
  "/admin/:id",
  upload.single("image"),
  galleryController.updateGallery
);

// Delete Gallery Image
router.delete(
  "/admin/:id",
  galleryController.deleteGallery
);
/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Get Active Gallery Images
router.get("/", galleryController.getAllGallery);

// Get Gallery Image By ID
router.get("/:id", galleryController.getGalleryById);


export default router;