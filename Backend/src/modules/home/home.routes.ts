import { Router } from "express";

import upload from "../../middleware/upload.middleware";

import * as homeController from "./home.controller";
import * as heroController from "./hero.controller";

const router = Router();



router.get("/admin", homeController.getHomeConfig);
/*


|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Complete Home Page Data
router.get("/", homeController.getHomeConfig);


/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Home Configuration
router.put(
  "/admin",
  upload.single("directorPhoto"),
  homeController.updateHomeConfig
);



export default router;