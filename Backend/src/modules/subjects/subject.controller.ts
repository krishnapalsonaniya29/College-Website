import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

import * as subjectService from "./subject.service";
import {
  createSubjectSchema,
  updateSubjectSchema,
} from "./subject.validation";

/*
|--------------------------------------------------------------------------
| Get Public Subjects
|--------------------------------------------------------------------------
*/

export const getSubjects = asyncHandler(
  async (req: Request, res: Response) => {
    const programId = req.query.programId
      ? Number(req.query.programId)
      : undefined;

    const subjects = await subjectService.getSubjects({
      programId,
    });

    res.json(
      new ApiResponse(
        true,
        "Subjects fetched successfully.",
        subjects
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Subjects (Admin)
|--------------------------------------------------------------------------
*/

export const getAdminSubjects = asyncHandler(
  async (_req: Request, res: Response) => {
    const subjects = await subjectService.getAdminSubjects();

    res.json(
      new ApiResponse(
        true,
        "Subjects fetched successfully.",
        subjects
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Subject By ID
|--------------------------------------------------------------------------
*/

export const getSubjectById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid subject ID.");
    }

    const subject = await subjectService.getSubjectById(id);

    if (!subject) {
      throw new ApiError(404, "Subject not found.");
    }

    res.json(
      new ApiResponse(
        true,
        "Subject fetched successfully.",
        subject
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Create Subject
|--------------------------------------------------------------------------
*/

export const createSubject = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createSubjectSchema.parse(req.body);

    const data: Prisma.SubjectCreateInput = {
      subjectCode: body.subjectCode,
      subjectName: body.subjectName,

      // Remove this block if Subject model doesn't have isActive
      ...(body.isActive !== undefined && {
        isActive: body.isActive,
      }),

      program: {
        connect: {
          id: body.programId,
        },
      },
    };

    const subject = await subjectService.createSubject(data);

    res.status(201).json(
      new ApiResponse(
        true,
        "Subject created successfully.",
        subject
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Update Subject
|--------------------------------------------------------------------------
*/

export const updateSubject = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid subject ID.");
    }

    const body = updateSubjectSchema.parse(req.body);

    const data: Prisma.SubjectUpdateInput = {};

    if (body.subjectCode !== undefined) {
      data.subjectCode = body.subjectCode;
    }

    if (body.subjectName !== undefined) {
      data.subjectName = body.subjectName;
    }

    // Remove this block if Subject model doesn't have isActive
    if (body.isActive !== undefined) {
      data.isActive = body.isActive;
    }

    if (body.programId !== undefined) {
      data.program = {
        connect: {
          id: body.programId,
        },
      };
    }

    const result = await subjectService.updateSubject(
      id,
      data
    );

    if (!result) {
      throw new ApiError(404, "Subject not found.");
    }

    res.json(
      new ApiResponse(
        true,
        "Subject updated successfully.",
        result.updatedSubject
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Delete Subject
|--------------------------------------------------------------------------
*/

export const deleteSubject = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid subject ID.");
    }

    const subject = await subjectService.deleteSubject(id);

    if (!subject) {
      throw new ApiError(404, "Subject not found.");
    }

    res.json(
      new ApiResponse(
        true,
        "Subject deleted successfully.",
        subject
      )
    );
  }
);