import { Router } from "express";

import upload from "../../middleware/upload.middleware";
import * as noticeController from "./notice.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Get Active Notices (Paginated)
// Public
router.get("/", noticeController.getNotices);

// Admin
router.get("/admin", noticeController.getAdminNotices);

router.post(
  "/admin",
  upload.single("pdf"),
  noticeController.createNotice
);

router.put(
  "/admin/:id",
  upload.single("pdf"),
  noticeController.updateNotice
);

router.delete(
  "/admin/:id",
  noticeController.deleteNotice
);

// Dynamic route should be last
router.get("/:id", noticeController.getNoticeById);

export default router;