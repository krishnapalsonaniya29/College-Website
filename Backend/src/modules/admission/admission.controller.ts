import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

import {
  uploadFile,
  deleteFile,
} from "../../utils/uploadToCloudinary";

import * as admissionService from "./admission.service";

import {
  createAdmissionSchema,
  updateAdmissionSchema,
} from "./admission.validation";

/*
|--------------------------------------------------------------------------
| Get Public Admissions
|--------------------------------------------------------------------------
*/

export const getAdmissions = asyncHandler(
  async (_req: Request, res: Response) => {
    const admissions =
      await admissionService.getAdmissions();

    res.json(
      new ApiResponse(
        true,
        "Admissions fetched successfully.",
        admissions
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Admin Admissions
|--------------------------------------------------------------------------
*/

export const getAdminAdmissions = asyncHandler(
  async (_req: Request, res: Response) => {
    const admissions =
      await admissionService.getAdminAdmissions();

    res.json(
      new ApiResponse(
        true,
        "Admissions fetched successfully.",
        admissions
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Admission By ID
|--------------------------------------------------------------------------
*/

export const getAdmissionById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid admission ID.");
    }

    const admission =
      await admissionService.getAdmissionById(id);

    if (!admission) {
      throw new ApiError(404, "Admission not found.");
    }

    res.json(
      new ApiResponse(
        true,
        "Admission fetched successfully.",
        admission
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Create Admission
|--------------------------------------------------------------------------
*/

export const createAdmission = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createAdmissionSchema.parse(req.body);

    if (!req.file) {
      throw new ApiError(400, "PDF file is required.");
    }

    const uploadedPdf = await uploadFile(
      req.file.buffer,
      "college/admission"
    );

    const data: Prisma.AdmissionCreateInput = {
      title: body.title,
      admissionDate: body.admissionDate,

      pdfUrl: uploadedPdf.secure_url,
      pdfPublicId: uploadedPdf.public_id,

      isActive: body.isActive ?? true,
    };

    const admission =
      await admissionService.createAdmission(data);

    res.status(201).json(
      new ApiResponse(
        true,
        "Admission created successfully.",
        admission
      )
    );
  }
);


/*
|--------------------------------------------------------------------------
| Update Admission
|--------------------------------------------------------------------------
*/

export const updateAdmission = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid admission ID.");
    }

    const body = updateAdmissionSchema.parse(req.body);

    const existing = await admissionService.getAdmissionById(id);

    if (!existing) {
      throw new ApiError(404, "Admission not found.");
    }

    const data: Prisma.AdmissionUpdateInput = {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.admissionDate !== undefined && {
        admissionDate: body.admissionDate,
      }),
      ...(body.isActive !== undefined && {
        isActive: body.isActive,
      }),
    };

    if (req.file) {
      if (existing.pdfPublicId) {
        await deleteFile(existing.pdfPublicId);
      }

      const uploadedPdf = await uploadFile(
        req.file.buffer,
        "college/admission"
      );

      data.pdfUrl = uploadedPdf.secure_url;
      data.pdfPublicId = uploadedPdf.public_id;
    }

    const admission = await admissionService.updateAdmission(
      id,
      data
    );

    res.json(
      new ApiResponse(
        true,
        "Admission updated successfully.",
        admission
      )
    );
  }
);


/*
|--------------------------------------------------------------------------
| Delete Admission
|--------------------------------------------------------------------------
*/

export const deleteAdmission = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid admission ID.");
    }

    const existing = await admissionService.getAdmissionById(id);

    if (!existing) {
      throw new ApiError(404, "Admission not found.");
    }

    if (existing.pdfPublicId) {
      await deleteFile(existing.pdfPublicId);
    }

    await admissionService.deleteAdmission(id);

    res.json(
      new ApiResponse(
        true,
        "Admission deleted successfully."
      )
    );
  }
);