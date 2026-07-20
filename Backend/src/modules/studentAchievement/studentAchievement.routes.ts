import { Router } from "express";


import upload from "../../middleware/upload.middleware";
import * as studentAchievementController from "./studentAchievement.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/admin",
  studentAchievementController.getAllStudentAchievements
);

router.post(
  "/admin",
  upload.single("photo"),
  studentAchievementController.createStudentAchievement
);

router.put(
  "/admin/:id",
  upload.single("photo"),
  studentAchievementController.updateStudentAchievement
);

router.delete(
  "/admin/:id",
  studentAchievementController.deleteStudentAchievement
);

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  studentAchievementController.getActiveStudentAchievements
);

router.get(
  "/:id",
  studentAchievementController.getStudentAchievementById
);

export default router;