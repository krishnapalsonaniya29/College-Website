import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

import {
  uploadFile,
  deleteFile,
} from "../../utils/uploadToCloudinary";

import * as departmentService from "./department.service";

import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from "./department.validation";

/*
|--------------------------------------------------------------------------
| Get Public Departments
|--------------------------------------------------------------------------
*/

export const getDepartments = asyncHandler(
  async (_req: Request, res: Response) => {
    const departments = await departmentService.getDepartments();

    res.json(
      new ApiResponse(
        true,
        "Departments fetched successfully.",
        departments
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Admin Departments
|--------------------------------------------------------------------------
*/

export const getAdminDepartments = asyncHandler(
  async (_req: Request, res: Response) => {
    const departments = await departmentService.getAdminDepartments();

    res.json(
      new ApiResponse(
        true,
        "Departments fetched successfully.",
        departments
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Department By Slug
|--------------------------------------------------------------------------
*/

export const getDepartmentBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params;

    const department =
      await departmentService.getDepartmentBySlug(slug);

    if (!department) {
      throw new ApiError(404, "Department not found.");
    }

    res.json(
      new ApiResponse(
        true,
        "Department fetched successfully.",
        department
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Department By ID (Admin)
|--------------------------------------------------------------------------
*/

export const getDepartmentById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid department ID.");
    }

    const department =
      await departmentService.getDepartmentById(id);

    if (!department) {
      throw new ApiError(404, "Department not found.");
    }

    res.json(
      new ApiResponse(
        true,
        "Department fetched successfully.",
        department
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Create Department
|--------------------------------------------------------------------------
*/

export const createDepartment = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createDepartmentSchema.parse(req.body);

    if (!req.file) {
      throw new ApiError(400, "Department logo is required.");
    }

    const uploadedLogo = await uploadFile(
      req.file.buffer,
      "college/departments"
    );

    const data: Prisma.DepartmentCreateInput = {
      name: body.name,
      slug: body.slug,
      description: body.description,
      vision: body.vision,
      mission: body.mission,
      isActive: body.isActive,

      logoUrl: uploadedLogo.secure_url,
      logoPublicId: uploadedLogo.public_id,
    };

    const department =
      await departmentService.createDepartment(data);

    res.status(201).json(
      new ApiResponse(
        true,
        "Department created successfully.",
        department
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Update Department
|--------------------------------------------------------------------------
*/

export const updateDepartment = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid department ID.");
    }

    const body = updateDepartmentSchema.parse(req.body);

    const data: Prisma.DepartmentUpdateInput = {};

    if (body.name !== undefined) {
      data.name = body.name;
    }

    if (body.slug !== undefined) {
      data.slug = body.slug;
    }

    if (body.description !== undefined) {
      data.description = body.description;
    }

    if (body.vision !== undefined) {
      data.vision = body.vision;
    }

    if (body.mission !== undefined) {
      data.mission = body.mission;
    }

    if (body.isActive !== undefined) {
      data.isActive = body.isActive;
    }

    if (req.file) {
      const uploadedLogo = await uploadFile(
        req.file.buffer,
        "college/departments"
      );

      data.logoUrl = uploadedLogo.secure_url;
      data.logoPublicId = uploadedLogo.public_id;
    }

    const result =
      await departmentService.updateDepartment(id, data);

    if (!result) {
      throw new ApiError(404, "Department not found.");
    }

    if (req.file && result.oldDepartment.logoPublicId) {
      await deleteFile(result.oldDepartment.logoPublicId);
    }

    res.json(
      new ApiResponse(
        true,
        "Department updated successfully.",
        result.updatedDepartment
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Delete Department
|--------------------------------------------------------------------------
*/

export const deleteDepartment = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid department ID.");
    }

    const department =
      await departmentService.deleteDepartment(id);

    if (!department) {
      throw new ApiError(404, "Department not found.");
    }

    if (department.logoPublicId) {
      await deleteFile(department.logoPublicId);
    }

    res.json(
      new ApiResponse(
        true,
        "Department deleted successfully.",
        department
      )
    );
  }
);