import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

import {
  uploadFile,
  deleteFile,
} from "../../utils/uploadToCloudinary";

import * as alumniService from "./alumni.service";

import {
  createAlumniSchema,
  updateAlumniSchema,
} from "./alumni.validation";

/*
|--------------------------------------------------------------------------
| Get Public Alumni
|--------------------------------------------------------------------------
*/

export const getAlumni = asyncHandler(
  async (req: Request, res: Response) => {
    const batch = req.query.batch
      ? Number(req.query.batch)
      : undefined;

    const course = req.query.course as string | undefined;

    const alumni = await alumniService.getAlumni({
      batch,
      course,
    });

    res.json(
      new ApiResponse(
        true,
        "Alumni fetched successfully.",
        alumni
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Admin Alumni
|--------------------------------------------------------------------------
*/

export const getAdminAlumni = asyncHandler(
  async (_req: Request, res: Response) => {
    const alumni = await alumniService.getAdminAlumni();

    res.json(
      new ApiResponse(
        true,
        "Alumni fetched successfully.",
        alumni
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Alumni By ID
|--------------------------------------------------------------------------
*/

export const getAlumniById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid alumni ID.");
    }

    const alumni = await alumniService.getAlumniById(id);

    if (!alumni) {
      throw new ApiError(404, "Alumni not found.");
    }

    res.json(
      new ApiResponse(
        true,
        "Alumni fetched successfully.",
        alumni
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Create Alumni
|--------------------------------------------------------------------------
*/

export const createAlumni = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createAlumniSchema.parse(req.body);

    if (!req.file) {
      throw new ApiError(400, "Photo is required.");
    }

    const uploadedPhoto = await uploadFile(
      req.file.buffer,
      "college/alumni"
    );

    const data: Prisma.AlumniCreateInput = {
      name: body.name,
      batch: body.batch,
      course: body.course,
      profession: body.profession,
      company: body.company,
      message: body.message,

      photoUrl: uploadedPhoto.secure_url,
      photoPublicId: uploadedPhoto.public_id,

      isActive: body.isActive ?? true,
    };

    const alumni = await alumniService.createAlumni(data);

    res.status(201).json(
      new ApiResponse(
        true,
        "Alumni created successfully.",
        alumni
      )
    );
  }
);
/*
|--------------------------------------------------------------------------
| Update Alumni
|--------------------------------------------------------------------------
*/

export const updateAlumni = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid alumni ID.");
    }

    const body = updateAlumniSchema.parse(req.body);

    const data: Prisma.AlumniUpdateInput = {};

    if (body.name !== undefined) {
      data.name = body.name;
    }

    if (body.batch !== undefined) {
      data.batch = body.batch;
    }

    if (body.course !== undefined) {
      data.course = body.course;
    }

    if (body.profession !== undefined) {
      data.profession = body.profession;
    }

    if (body.company !== undefined) {
      data.company = body.company;
    }

    if (body.message !== undefined) {
      data.message = body.message;
    }

    if (body.isActive !== undefined) {
      data.isActive = body.isActive;
    }

    const result = await alumniService.updateAlumni(id, data);

    if (!result) {
      throw new ApiError(404, "Alumni not found.");
    }

    /*
    |--------------------------------------------------------------------------
    | Upload New Photo (Optional)
    |--------------------------------------------------------------------------
    */

    if (req.file) {
      const uploadedPhoto = await uploadFile(
        req.file.buffer,
        "college/alumni"
      );

      if (result.oldAlumni.photoPublicId) {
        await deleteFile(result.oldAlumni.photoPublicId);
      }

      data.photoUrl = uploadedPhoto.secure_url;
      data.photoPublicId = uploadedPhoto.public_id;

      result.updatedAlumni = await alumniService.updateAlumni(
        id,
        data
      ).then((res) => res!.updatedAlumni);
    }

    res.json(
      new ApiResponse(
        true,
        "Alumni updated successfully.",
        result.updatedAlumni
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Delete Alumni
|--------------------------------------------------------------------------
*/

export const deleteAlumni = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid alumni ID.");
    }

    const alumni = await alumniService.deleteAlumni(id);

    if (!alumni) {
      throw new ApiError(404, "Alumni not found.");
    }

    if (alumni.photoPublicId) {
      await deleteFile(alumni.photoPublicId);
    }

    res.json(
      new ApiResponse(
        true,
        "Alumni deleted successfully.",
        alumni
      )
    );
  }
);