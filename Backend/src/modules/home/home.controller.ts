import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";

import {
  uploadFile,
  deleteFile,
} from "../../utils/uploadToCloudinary";

import { updateHomeConfigSchema } from "./home.validation";
import * as homeService from "./home.service";

/*
|--------------------------------------------------------------------------
| Get Home Configuration
|--------------------------------------------------------------------------
*/

export const getHomeConfig = asyncHandler(
  async (_req: Request, res: Response) => {
    const homeConfig = await homeService.getHomeConfig();

    res.json(
      new ApiResponse(
        true,
        "Home configuration fetched successfully",
        homeConfig
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Update Home Configuration
|--------------------------------------------------------------------------
*/

export const updateHomeConfig = asyncHandler(
  async (req: Request, res: Response) => {
    const body = updateHomeConfigSchema.parse(req.body);

    const updateData: Prisma.HomeConfigUpdateInput = {
      ...body,
    };

    // Upload new director image (optional)
    if (req.file) {
      const uploadedImage = await uploadFile(
        req.file.buffer,
        "college/home/director"
      );

      updateData.directorPhotoUrl = uploadedImage.secure_url;
      updateData.directorPhotoPublicId =
        uploadedImage.public_id;
    }

    const result = await homeService.updateHomeConfig(
      updateData
    );

    // Delete old image only after successful DB update
    if (
      req.file &&
      result.oldConfig.directorPhotoPublicId
    ) {
      await deleteFile(
        result.oldConfig.directorPhotoPublicId
      );
    }

    res.json(
      new ApiResponse(
        true,
        "Home configuration updated successfully",
        result.updatedConfig
      )
    );
  }
);