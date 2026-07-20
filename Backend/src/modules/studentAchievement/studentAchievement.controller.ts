import { Request, Response } from "express";

import {
  uploadFile,
  deleteFile,
} from "../../utils/uploadToCloudinary";

import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

import * as studentAchievementService from "./studentAchievement.service";

import {
  createStudentAchievementSchema,
  updateStudentAchievementSchema,
} from "./studentAchievement.validation";

export const createStudentAchievement = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("req.body =", req.body);
console.log("req.file =", req.file);
    const data = createStudentAchievementSchema.parse(req.body);

    if (!req.file) {
      throw new ApiError(400, "Photo is required.");
    }

    const uploaded = await uploadFile(
      req.file.buffer,
      "college/student-achievements"
    );

    const achievement =
      await studentAchievementService.createStudentAchievement({
        ...data,
        photoUrl: uploaded.secure_url,
        photoPublicId: uploaded.public_id,
      });

    res.status(201).json(
      new ApiResponse(
        true,
        "Student achievement created successfully.",
        achievement
      )
    );
  }
);

export const getAllStudentAchievements = asyncHandler(
  async (_req: Request, res: Response) => {
    const achievements =
      await studentAchievementService.getAllStudentAchievements();

    res.json(
      new ApiResponse(
        true,
        "Student achievements fetched successfully.",
        achievements
      )
    );
  }
);

export const getActiveStudentAchievements = asyncHandler(
  async (_req: Request, res: Response) => {
    const achievements =
      await studentAchievementService.getActiveStudentAchievements();

    res.json(
      new ApiResponse(
        true,
        "Student achievements fetched successfully.",
        achievements
      )
    );
  }
);

export const getStudentAchievementById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const achievement =
      await studentAchievementService.getStudentAchievementById(id);

    if (!achievement) {
      throw new ApiError(404, "Achievement not found.");
    }

    res.json(
      new ApiResponse(
        true,
        "Student achievement fetched successfully.",
        achievement
      )
    );
  }
);

export const updateStudentAchievement = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const existing =
      await studentAchievementService.getStudentAchievementById(id);

    if (!existing) {
      throw new ApiError(404, "Achievement not found.");
    }

    const data =
      updateStudentAchievementSchema.parse(req.body);

    let photoUrl = existing.photoUrl;
    let photoPublicId = existing.photoPublicId;

    if (req.file) {
      await deleteFile(existing.photoPublicId);

      const uploaded = await uploadFile(
        req.file.buffer,
        "college/student-achievements"
      );

      photoUrl = uploaded.secure_url;
      photoPublicId = uploaded.public_id;
    }

    const achievement =
      await studentAchievementService.updateStudentAchievement(
        id,
        {
          ...data,
          photoUrl,
          photoPublicId,
        }
      );

    res.json(
      new ApiResponse(
        true,
        "Student achievement updated successfully.",
        achievement
      )
    );
  }
);

export const deleteStudentAchievement = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const achievement =
      await studentAchievementService.getStudentAchievementById(id);

    if (!achievement) {
      throw new ApiError(404, "Achievement not found.");
    }

    await deleteFile(achievement.photoPublicId);

    await studentAchievementService.deleteStudentAchievement(
      id
    );

    res.json(
      new ApiResponse(
        true,
        "Student achievement deleted successfully."
      )
    );
  }
);