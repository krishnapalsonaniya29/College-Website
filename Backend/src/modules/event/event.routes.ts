import { Router } from "express";
import upload from "../../middleware/upload.middleware";
import * as eventController from "./event.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/admin",
  eventController.getAdminEvents
);

router.post(
  "/admin",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  eventController.createEvent
);

router.put(
  "/admin/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  eventController.updateEvent
);

router.delete(
  "/admin/:id",
  eventController.deleteEvent
);

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  eventController.getEvents
);

router.get(
  "/:id",
  eventController.getEventById
);

export default router;