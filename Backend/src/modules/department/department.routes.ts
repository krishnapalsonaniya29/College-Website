import { Router } from "express";
import upload from "../../middleware/upload.middleware";
import * as departmentController from "./department.controller";

const router = Router();


/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
// Get All Departments
router.get("/", departmentController.getDepartments);

// Get All Departments (Admin)
router.get("/admin/all", departmentController.getAdminDepartments);

// Get Department By ID (Admin)
router.get("/admin/:id", departmentController.getDepartmentById);


// Update Department
router.put(
  "/admin/:id",
  upload.single("logo"),
  departmentController.updateDepartment
);

// Delete Department
router.delete(
  "/admin/:id",
  departmentController.deleteDepartment
);

// Create Department
router.post(
  "/admin",
  upload.single("logo"),
  departmentController.createDepartment
);
/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/



// Get Department By Slug
router.get("/:slug", departmentController.getDepartmentBySlug);






export default router;