import { Router } from "express";
import upload from "../../middleware/upload.middleware";
import * as newsController from "./news.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/admin",
  newsController.getAdminNews
);

router.post(
  "/admin",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  newsController.createNews
);

router.put(
  "/admin/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  newsController.updateNews
);

router.delete(
  "/admin/:id",
  newsController.deleteNews
);

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  newsController.getNews
);

router.get(
  "/:id",
  newsController.getNewsById
);

export default router;