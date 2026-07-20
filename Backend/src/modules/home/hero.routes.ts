import { Router } from "express";
import multer from "multer";

import * as heroController from "./hero.controller";
import { verifyJWT } from "../../middleware/auth.middleware";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

// Public
router.get("/", heroController.getHeroSlides);
router.get("/admin", verifyJWT, heroController.getHeroSlides);
router.get("/:id", heroController.getHeroSlideById);

// Admin


router.post(
  "/",
  verifyJWT,
  upload.single("image"),
  heroController.createHeroSlide
);

router.put(
  "/:id",
  verifyJWT,
  upload.single("image"),
  heroController.updateHeroSlide
);

router.delete(
  "/:id",
  verifyJWT,
  heroController.deleteHeroSlide
);

export default router;