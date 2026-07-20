import { Prisma, ProgramCategory } from "@prisma/client";
import { Request, Response } from "express";

import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

import * as programService from "./program.service";
import {
  createProgramSchema,
  updateProgramSchema,
} from "./program.validation";

/*
|--------------------------------------------------------------------------
| Get Public Programs
|--------------------------------------------------------------------------
*/

export const getPrograms = asyncHandler(
  async (req: Request, res: Response) => {
    const category = req.query.category as
      | ProgramCategory
      | undefined;

    const programs = await programService.getPrograms({
      category,
    });

    res.json(
      new ApiResponse(
        true,
        "Programs fetched successfully.",
        programs
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Programs (Admin)
|--------------------------------------------------------------------------
*/

export const getAdminPrograms = asyncHandler(
  async (_req: Request, res: Response) => {
    const programs =
      await programService.getAdminPrograms();

    res.json(
      new ApiResponse(
        true,
        "Programs fetched successfully.",
        programs
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Program By ID
|--------------------------------------------------------------------------
*/

export const getProgramById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid program ID.");
    }

    const program =
      await programService.getProgramById(id);

    if (!program) {
      throw new ApiError(404, "Program not found.");
    }

    res.json(
      new ApiResponse(
        true,
        "Program fetched successfully.",
        program
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Create Program
|--------------------------------------------------------------------------
*/

export const createProgram = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createProgramSchema.parse(req.body);

    const data: Prisma.ProgramCreateInput = {
      name: body.name,
      category: body.category,

      // Remove this line if your schema doesn't have isActive
      ...(body.isActive !== undefined && {
        isActive: body.isActive,
      }),
    };

    const program =
      await programService.createProgram(data);

    res.status(201).json(
      new ApiResponse(
        true,
        "Program created successfully.",
        program
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Update Program
|--------------------------------------------------------------------------
*/

export const updateProgram = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid program ID.");
    }

    const body = updateProgramSchema.parse(req.body);

    const data: Prisma.ProgramUpdateInput = {};

    if (body.name !== undefined) {
      data.name = body.name;
    }

    if (body.category !== undefined) {
      data.category = body.category;
    }

    // Remove this block if your Program model doesn't have isActive
    if (body.isActive !== undefined) {
      data.isActive = body.isActive;
    }

    const result = await programService.updateProgram(
      id,
      data
    );

    if (!result) {
      throw new ApiError(404, "Program not found.");
    }

    res.json(
      new ApiResponse(
        true,
        "Program updated successfully.",
        result.updatedProgram
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Delete Program
|--------------------------------------------------------------------------
*/

export const deleteProgram = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid program ID.");
    }

    const program = await programService.deleteProgram(id);

    if (!program) {
      throw new ApiError(404, "Program not found.");
    }

    res.json(
      new ApiResponse(
        true,
        "Program deleted successfully.",
        program
      )
    );
  }
);