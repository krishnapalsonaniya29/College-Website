import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";

import {
  uploadFile,
  deleteFile,
} from "../../utils/uploadToCloudinary";

import { updateAboutSchema } from "./about.validation";
import * as aboutService from "./about.service";

/*
|--------------------------------------------------------------------------
| Get About Configuration
|--------------------------------------------------------------------------
*/

export const getAbout = asyncHandler(
  async (_req: Request, res: Response) => {
    const about = await aboutService.getAbout();

    res.json(
      new ApiResponse(
        true,
        "About information fetched successfully.",
        about
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Update About Configuration
|--------------------------------------------------------------------------
*/

export const updateAbout = asyncHandler(
  async (req: Request, res: Response) => {
    const body = updateAboutSchema.parse(req.body);

    const updateData: Prisma.AboutUpdateInput = {
      ...body,
    };

    // Upload Principal Photo (optional)
    if (req.file) {
      const uploadedImage = await uploadFile(
        req.file.buffer,
        "college/about/principal"
      );

      updateData.principalPhotoUrl = uploadedImage.secure_url;
      updateData.principalPhotoPublicId =
        uploadedImage.public_id;
    }

    const result = await aboutService.updateAbout(
      updateData
    );

    // Delete old image after successful database update
    if (
      req.file &&
      result.oldAbout.principalPhotoPublicId
    ) {
      await deleteFile(
        result.oldAbout.principalPhotoPublicId
      );
    }

    res.json(
      new ApiResponse(
        true,
        "About information updated successfully.",
        result.updatedAbout
      )
    );
  }
);