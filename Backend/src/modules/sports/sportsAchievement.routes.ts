import { Router } from "express";
import * as sportsAchievementController from "./sportsAchievement.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/admin",
  sportsAchievementController.getAdminSportsAchievements
);

router.post(
  "/admin",
  sportsAchievementController.createSportsAchievement
);

router.put(
  "/admin/:id",
  sportsAchievementController.updateSportsAchievement
);

router.delete(
  "/admin/:id",
  sportsAchievementController.deleteSportsAchievement
);

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  sportsAchievementController.getSportsAchievements
);

router.get(
  "/:id",
  sportsAchievementController.getSportsAchievementById
);

export default router;