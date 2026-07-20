import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import {
  uploadFile,
  deleteFile,
} from "../../utils/uploadToCloudinary";

import {
  createHeroSlideSchema,
  updateHeroSlideSchema,
} from "./hero.validation";

import * as heroService from "./hero.service";

/*
|--------------------------------------------------------------------------
| Get All Hero Slides
|--------------------------------------------------------------------------
*/

export const getHeroSlides = asyncHandler(
  async (_req: Request, res: Response) => {
    const slides = await heroService.getHeroSlides();

    res.json(
      new ApiResponse(
        true,
        "Hero slides fetched successfully",
        slides
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Hero Slide By ID
|--------------------------------------------------------------------------
*/

export const getHeroSlideById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid hero slide ID");
    }

    const slide = await heroService.getHeroSlideById(id);

    res.json(
      new ApiResponse(
        true,
        "Hero slide fetched successfully",
        slide
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Create Hero Slide
|--------------------------------------------------------------------------
*/

export const createHeroSlide = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) {
      throw new ApiError(400, "Hero image is required");
    }
      console.log(req.body);



    const body = createHeroSlideSchema.parse(req.body);

    const uploadedImage = await uploadFile(
      req.file.buffer,
      "college/home/hero-slides"
    );

    const slide = await heroService.createHeroSlide({
      ...body,
      imageUrl: uploadedImage.secure_url,
      imagePublicId: uploadedImage.public_id,
    });

    res.status(201).json(
      new ApiResponse(
        true,
        "Hero slide created successfully",
        slide
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Update Hero Slide
|--------------------------------------------------------------------------
*/

export const updateHeroSlide = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid hero slide ID");
    }

    const body = updateHeroSlideSchema.parse(req.body);

    const updateData: Prisma.HeroSlideUpdateInput = {
      ...body,
    };

    if (req.file) {
      const uploadedImage = await uploadFile(
        req.file.buffer,
        "college/home/hero-slides"
      );

      updateData.imageUrl = uploadedImage.secure_url;
      updateData.imagePublicId = uploadedImage.public_id;
    }

    const result = await heroService.updateHeroSlide(
      id,
      updateData
    );

    // Delete previous Cloudinary image only after successful update
    if (req.file && result.oldSlide.imagePublicId) {
      await deleteFile(result.oldSlide.imagePublicId);
    }

    res.json(
      new ApiResponse(
        true,
        "Hero slide updated successfully",
        result.updatedSlide
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Delete Hero Slide
|--------------------------------------------------------------------------
*/

export const deleteHeroSlide = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid hero slide ID");
    }

    const slide = await heroService.deleteHeroSlide(id);

    if (slide.imagePublicId) {
      await deleteFile(slide.imagePublicId);
    }

    res.json(
      new ApiResponse(
        true,
        "Hero slide deleted successfully"
      )
    );
  }
);