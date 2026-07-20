import { Prisma, GalleryCategory } from "@prisma/client";
import { Request, Response } from "express";

import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

import {
  uploadFile,
  deleteFile,
} from "../../utils/uploadToCloudinary";

import * as galleryService from "./gallery.service";

import {
  createGallerySchema,
  updateGallerySchema,
} from "./gallery.validation";

export const createGallery = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = createGallerySchema.parse(req.body);
console.log(req.body);
console.log(parsedData);
  if (!req.file) {
    throw new ApiError(400, "Image is required");
  }

  const uploadedFile = await uploadFile(req.file.buffer, "gallery");

  const data: Prisma.GalleryCreateInput = {
   title:
  parsedData.title ||
  `${parsedData.category} Image`,
    category: parsedData.category,
    isActive: parsedData.isActive,
    imageUrl: uploadedFile.secure_url,
    imagePublicId: uploadedFile.public_id,

    ...(parsedData.departmentId && {
      department: {
        connect: {
          id: parsedData.departmentId,
        },
      },
    }),
  };

  const gallery = await galleryService.createGallery(data);

  res.status(201).json(
    new ApiResponse(true, "Gallery item created successfully", gallery)
  );
});

export const getAllGallery = asyncHandler(async (req: Request, res: Response) => {
  const filters = {
    category: req.query.category as GalleryCategory | undefined,

    departmentId: req.query.departmentId
      ? Number(req.query.departmentId)
      : undefined,

    isActive:
      req.query.isActive !== undefined
        ? req.query.isActive === "true"
        : undefined,
  };

  const gallery = await galleryService.getAllGallery(filters);

  res.json(
    new ApiResponse(true, "Gallery fetched successfully", gallery)
  );
});

export const getGalleryById = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    throw new ApiError(400, "Invalid gallery ID");
  }

  const gallery = await galleryService.getGalleryById(id);

  res.json(
    new ApiResponse(true, "Gallery fetched successfully", gallery)
  );
});

export const updateGallery = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    throw new ApiError(400, "Invalid gallery ID");
  }

  const parsedData = updateGallerySchema.parse(req.body);

  const existingGallery = await galleryService.getGalleryById(id);

  const data: Prisma.GalleryUpdateInput = {
    ...(parsedData.title && {
      title:
  parsedData.title ||
  `${parsedData.category} Image`,
    }),

    ...(parsedData.category && {
      category: parsedData.category,
    }),

    ...(parsedData.isActive !== undefined && {
      isActive: parsedData.isActive,
    }),

    ...(parsedData.departmentId !== undefined && {
      department:
        parsedData.departmentId === null
          ? {
              disconnect: true,
            }
          : {
              connect: {
                id: parsedData.departmentId,
              },
            },
    }),
  };

  if (req.file) {
    if (existingGallery.imagePublicId) {
      await deleteFile(existingGallery.imagePublicId);
    }

    const uploadedFile = await uploadFile(req.file.buffer, "gallery");

    data.imageUrl = uploadedFile.secure_url;
    data.imagePublicId = uploadedFile.public_id;
  }

  const gallery = await galleryService.updateGallery(id, data);

  res.json(
    new ApiResponse(true, "Gallery updated successfully", gallery)
  );
});

export const deleteGallery = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    throw new ApiError(400, "Invalid gallery ID");
  }

  const gallery = await galleryService.getGalleryById(id);

  if (gallery.imagePublicId) {
    await deleteFile(gallery.imagePublicId);
  }

  await galleryService.deleteGallery(id);

  res.json(
    new ApiResponse(true, "Gallery deleted successfully")
  );
});