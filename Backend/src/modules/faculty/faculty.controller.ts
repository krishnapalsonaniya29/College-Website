import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

import {
  uploadFile,
  deleteFile,
} from "../../utils/uploadToCloudinary";

import * as facultyService from "./faculty.service";

import {
  createFacultySchema,
  updateFacultySchema,
} from "./faculty.validation";

/*
|--------------------------------------------------------------------------
| Get Public Faculty
|--------------------------------------------------------------------------
*/

export const getFaculty = asyncHandler(
  async (req: Request, res: Response) => {
    const departmentId = req.query.departmentId
      ? Number(req.query.departmentId)
      : undefined;

    const faculty = await facultyService.getFaculty({
      departmentId,
    });

    res.json(
      new ApiResponse(
        true,
        "Faculty fetched successfully.",
        faculty
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Faculty (Admin)
|--------------------------------------------------------------------------
*/

export const getAdminFaculty = asyncHandler(
  async (_req: Request, res: Response) => {
    const faculty = await facultyService.getAdminFaculty();

    res.json(
      new ApiResponse(
        true,
        "Faculty fetched successfully.",
        faculty
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Faculty By ID
|--------------------------------------------------------------------------
*/

export const getFacultyById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid faculty ID.");
    }

    const faculty = await facultyService.getFacultyById(id);

    if (!faculty) {
      throw new ApiError(404, "Faculty member not found.");
    }

    res.json(
      new ApiResponse(
        true,
        "Faculty fetched successfully.",
        faculty
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Create Faculty
|--------------------------------------------------------------------------
*/

export const createFaculty = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createFacultySchema.parse(req.body);

    if (!req.file) {
      throw new ApiError(400, "Faculty photo is required.");
    }

    const uploadedPhoto = await uploadFile(
      req.file.buffer,
      "college/faculty"
    );

    // Optional: Ensure only one HOD per department
    if (body.isHOD) {
      const currentHOD = await facultyService.getFaculty({
        departmentId: body.departmentId,
      });

      const hod = currentHOD.find((f) => f.isHOD);

      if (hod) {
        await facultyService.updateFaculty(hod.id, {
          isHOD: false,
        });
      }
    }

    const data: Prisma.FacultyCreateInput = {
      name: body.name,
      designation: body.designation,
      qualification: body.qualification,
      experience: body.experience,
      email: body.email,
      isHOD: body.isHOD,
      isActive: body.isActive,

      photoUrl: uploadedPhoto.secure_url,
      photoPublicId: uploadedPhoto.public_id,

      department: {
        connect: {
          id: body.departmentId,
        },
      },
    };

    const faculty = await facultyService.createFaculty(data);

    res.status(201).json(
      new ApiResponse(
        true,
        "Faculty created successfully.",
        faculty
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Update Faculty
|--------------------------------------------------------------------------
*/

export const updateFaculty = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid faculty ID.");
    }

    const body = updateFacultySchema.parse(req.body);

    const data: Prisma.FacultyUpdateInput = {};

    if (body.name !== undefined) {
      data.name = body.name;
    }

    if (body.designation !== undefined) {
      data.designation = body.designation;
    }

    if (body.qualification !== undefined) {
      data.qualification = body.qualification;
    }

    if (body.experience !== undefined) {
      data.experience = body.experience;
    }

    if (body.email !== undefined) {
      data.email = body.email;
    }

    if (body.isActive !== undefined) {
      data.isActive = body.isActive;
    }

    if (body.isHOD !== undefined) {
      data.isHOD = body.isHOD;
    }

    if (body.departmentId !== undefined) {
      data.department = {
        connect: {
          id: body.departmentId,
        },
      };
    }

    /*
    |--------------------------------------------------------------------------
    | Ensure Only One HOD Per Department
    |--------------------------------------------------------------------------
    */

    if (body.isHOD && body.departmentId) {
      const facultyMembers = await facultyService.getFaculty({
        departmentId: body.departmentId,
      });

      const currentHOD = facultyMembers.find(
        (member) => member.isHOD && member.id !== id
      );

      if (currentHOD) {
        await facultyService.updateFaculty(currentHOD.id, {
          isHOD: false,
        });
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Upload New Photo
    |--------------------------------------------------------------------------
    */

    if (req.file) {
      const uploadedPhoto = await uploadFile(
        req.file.buffer,
        "college/faculty"
      );

      data.photoUrl = uploadedPhoto.secure_url;
      data.photoPublicId = uploadedPhoto.public_id;
    }

    const result = await facultyService.updateFaculty(id, data);

    if (!result) {
      throw new ApiError(404, "Faculty member not found.");
    }

    /*
    |--------------------------------------------------------------------------
    | Delete Old Photo
    |--------------------------------------------------------------------------
    */

    if (req.file && result.oldFaculty.photoPublicId) {
      await deleteFile(result.oldFaculty.photoPublicId);
    }

    res.json(
      new ApiResponse(
        true,
        "Faculty updated successfully.",
        result.updatedFaculty
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Delete Faculty
|--------------------------------------------------------------------------
*/

export const deleteFaculty = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid faculty ID.");
    }

    const faculty = await facultyService.deleteFaculty(id);

    if (!faculty) {
      throw new ApiError(404, "Faculty member not found.");
    }

    if (faculty.photoPublicId) {
      await deleteFile(faculty.photoPublicId);
    }

    res.json(
      new ApiResponse(
        true,
        "Faculty deleted successfully.",
        faculty
      )
    );
  }
);