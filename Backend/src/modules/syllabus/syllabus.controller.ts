import { Prisma, Semester } from "@prisma/client";
import { Request, Response } from "express";

import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

import { uploadFile, deleteFile } from "../../utils/uploadToCloudinary";

import * as syllabusService from "./syllabus.service";

import {
  createSyllabusSchema,
  updateSyllabusSchema,
} from "./syllabus.validation";

/*
|--------------------------------------------------------------------------
| Get Public Syllabus
|--------------------------------------------------------------------------
*/

export const getSyllabus = asyncHandler(
  async (req: Request, res: Response) => {
    const subjectId = req.query.subjectId
      ? Number(req.query.subjectId)
      : undefined;

    const semester = req.query.semester as Semester | undefined;

    const syllabus = await syllabusService.getSyllabus({
      subjectId,
      semester,
    });

    res.json(
      new ApiResponse(
        true,
        "Syllabus fetched successfully.",
        syllabus
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Admin Syllabus
|--------------------------------------------------------------------------
*/

export const getAdminSyllabus = asyncHandler(
  async (_req: Request, res: Response) => {
    const syllabus = await syllabusService.getAdminSyllabus();

    res.json(
      new ApiResponse(
        true,
        "Syllabus fetched successfully.",
        syllabus
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Syllabus By ID
|--------------------------------------------------------------------------
*/

export const getSyllabusById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid syllabus ID.");
    }

    const syllabus = await syllabusService.getSyllabusById(id);

    if (!syllabus) {
      throw new ApiError(404, "Syllabus not found.");
    }

    res.json(
      new ApiResponse(
        true,
        "Syllabus fetched successfully.",
        syllabus
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Create Syllabus
|--------------------------------------------------------------------------
*/

export const createSyllabus = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createSyllabusSchema.parse(req.body);

    if (!req.file) {
      throw new ApiError(400, "PDF file is required.");
    }

    const uploadedPdf = await uploadFile(
      req.file.buffer,
      "college/syllabus"
    );

    const data: Prisma.SyllabusCreateInput = {
      semester: body.semester,

      pdfUrl: uploadedPdf.secure_url,
      pdfPublicId: uploadedPdf.public_id,

      ...(body.isActive !== undefined && {
        isActive: body.isActive,
      }),

      subject: {
        connect: {
          id: body.subjectId,
        },
      },
    };

    const syllabus = await syllabusService.createSyllabus(data);

    res.status(201).json(
      new ApiResponse(
        true,
        "Syllabus created successfully.",
        syllabus
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Update Syllabus
|--------------------------------------------------------------------------
*/

export const updateSyllabus = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid syllabus ID.");
    }

    const body = updateSyllabusSchema.parse(req.body);

    const data: Prisma.SyllabusUpdateInput = {};

    if (body.subjectId !== undefined) {
      data.subject = {
        connect: {
          id: body.subjectId,
        },
      };
    }

    if (body.semester !== undefined) {
      data.semester = body.semester;
    }

    // Remove this block if you don't have isActive
    if (body.isActive !== undefined) {
      data.isActive = body.isActive;
    }

    const existingSyllabus =
      await syllabusService.getSyllabusById(id);

    if (!existingSyllabus) {
      throw new ApiError(404, "Syllabus not found.");
    }

    /*
    |--------------------------------------------------------------------------
    | Upload New PDF (Optional)
    |--------------------------------------------------------------------------
    */

    if (req.file) {
      const uploadedPdf = await uploadFile(
        req.file.buffer,
        "college/syllabus"
      );

      if (existingSyllabus.pdfPublicId) {
        await deleteFile(existingSyllabus.pdfPublicId);
      }

      data.pdfUrl = uploadedPdf.secure_url;
      data.pdfPublicId = uploadedPdf.public_id;
    }

    const result = await syllabusService.updateSyllabus(
      id,
      data
    );

    if (!result) {
      throw new ApiError(404, "Syllabus not found.");
    }

    res.json(
      new ApiResponse(
        true,
        "Syllabus updated successfully.",
        result.updatedSyllabus
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Delete Syllabus
|--------------------------------------------------------------------------
*/

export const deleteSyllabus = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid syllabus ID.");
    }

    const syllabus =
      await syllabusService.deleteSyllabus(id);

    if (!syllabus) {
      throw new ApiError(404, "Syllabus not found.");
    }

    if (syllabus.pdfPublicId) {
      await deleteFile(syllabus.pdfPublicId);
    }

    res.json(
      new ApiResponse(
        true,
        "Syllabus deleted successfully.",
        syllabus
      )
    );
  }
);