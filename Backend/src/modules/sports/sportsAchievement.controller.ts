import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

import * as sportsAchievementService from "./sportsAchievement.service";

import {
  createSportsAchievementSchema,
  updateSportsAchievementSchema,
} from "./sportsAchievement.validation";

/*
|--------------------------------------------------------------------------
| Get Public Sports Achievements
|--------------------------------------------------------------------------
*/

export const getSportsAchievements = asyncHandler(
  async (_req: Request, res: Response) => {
    const achievements =
      await sportsAchievementService.getSportsAchievements();

    res.json(
      new ApiResponse(
        true,
        "Sports achievements fetched successfully.",
        achievements
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Admin Sports Achievements
|--------------------------------------------------------------------------
*/

export const getAdminSportsAchievements = asyncHandler(
  async (_req: Request, res: Response) => {
    const achievements =
      await sportsAchievementService.getAdminSportsAchievements();

    res.json(
      new ApiResponse(
        true,
        "Sports achievements fetched successfully.",
        achievements
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Sports Achievement By ID
|--------------------------------------------------------------------------
*/

export const getSportsAchievementById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(
        400,
        "Invalid sports achievement ID."
      );
    }

    const achievement =
      await sportsAchievementService.getSportsAchievementById(
        id
      );

    if (!achievement) {
      throw new ApiError(
        404,
        "Sports achievement not found."
      );
    }

    res.json(
      new ApiResponse(
        true,
        "Sports achievement fetched successfully.",
        achievement
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Create Sports Achievement
|--------------------------------------------------------------------------
*/

export const createSportsAchievement = asyncHandler(
  async (req: Request, res: Response) => {
    const body =
      createSportsAchievementSchema.parse(req.body);

    const data: Prisma.SportsAchievementCreateInput = {
      title: body.title,
      description: body.description,
      achievementDate: body.achievementDate,
      isActive: body.isActive ?? true,
    };

    const achievement =
      await sportsAchievementService.createSportsAchievement(
        data
      );

    res.status(201).json(
      new ApiResponse(
        true,
        "Sports achievement created successfully.",
        achievement
      )
    );
  }
);


/*
|--------------------------------------------------------------------------
| Update Sports Achievement
|--------------------------------------------------------------------------
*/

export const updateSportsAchievement = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid sports achievement ID.");
    }

    const body = updateSportsAchievementSchema.parse(req.body);

    const existing =
  await sportsAchievementService.getSportsAchievementById(id);

    if (!existing) {
      throw new ApiError(404, "Sports achievement not found.");
    }

    const data: Prisma.SportsAchievementUpdateInput = {
      ...(body.title !== undefined && {
        title: body.title,
      }),
      ...(body.description !== undefined && {
        description: body.description,
      }),
      ...(body.achievementDate !== undefined && {
        achievementDate: body.achievementDate,
      }),
      ...(body.isActive !== undefined && {
        isActive: body.isActive,
      }),
    };

    const achievement =
      await sportsAchievementService.updateSportsAchievement(
        id,
        data
      );

    res.json(
      new ApiResponse(
        true,
        "Sports achievement updated successfully.",
        achievement
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Delete Sports Achievement
|--------------------------------------------------------------------------
*/

export const deleteSportsAchievement = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid sports achievement ID.");
    }

    const existing =
      await sportsAchievementService.getSportsAchievementById(
        id
      );

    if (!existing) {
      throw new ApiError(404, "Sports achievement not found.");
    }

    await sportsAchievementService.deleteSportsAchievement(
      id
    );

    res.json(
      new ApiResponse(
        true,
        "Sports achievement deleted successfully."
      )
    );
  }
);