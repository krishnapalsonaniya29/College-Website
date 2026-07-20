import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

import { NewsCategory } from "@prisma/client";


import {
  uploadFile,
  deleteFile,
} from "../../utils/uploadToCloudinary";

import * as newsService from "./news.service";

import {
  createNewsSchema,
  updateNewsSchema,
} from "./news.validation";

/*
|--------------------------------------------------------------------------
| Get Public News
|--------------------------------------------------------------------------
*/


export const getNews = asyncHandler(
  async (req: Request, res: Response) => {
    const category = req.query
      .category as NewsCategory | undefined;

    const news = await newsService.getNews(category);

    res.json(
      new ApiResponse(
        true,
        "News fetched successfully.",
        news
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Admin News
|--------------------------------------------------------------------------
*/

export const getAdminNews = asyncHandler(
  async (_req: Request, res: Response) => {
    const news = await newsService.getAdminNews();

    res.json(
      new ApiResponse(
        true,
        "News fetched successfully.",
        news
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get News By ID
|--------------------------------------------------------------------------
*/

export const getNewsById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid news ID.");
    }

    const news = await newsService.getNewsById(id);

    if (!news) {
      throw new ApiError(404, "News not found.");
    }

    res.json(
      new ApiResponse(
        true,
        "News fetched successfully.",
        news
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Create News
|--------------------------------------------------------------------------
*/

export const createNews = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createNewsSchema.parse(req.body);

    const files = req.files as
      | {
          image?: Express.Multer.File[];
          pdf?: Express.Multer.File[];
        }
      | undefined;

    let imageUrl: string | undefined;
    let imagePublicId: string | undefined;

    let pdfUrl: string | undefined;
    let pdfPublicId: string | undefined;

    /*
    |--------------------------------------------------------------------------
    | Upload Image
    |--------------------------------------------------------------------------
    */

    if (files?.image?.[0]) {
      const uploadedImage = await uploadFile(
        files.image[0].buffer,
        "college/news/images"
      );

      imageUrl = uploadedImage.secure_url;
      imagePublicId = uploadedImage.public_id;
    }

    /*
    |--------------------------------------------------------------------------
    | Upload PDF
    |--------------------------------------------------------------------------
    */

    if (files?.pdf?.[0]) {
      const uploadedPdf = await uploadFile(
        files.pdf[0].buffer,
        "college/news/pdfs"
      );

      pdfUrl = uploadedPdf.secure_url;
      pdfPublicId = uploadedPdf.public_id;
    }

    const data: Prisma.NewsCreateInput = {
  title: body.title,
  description: body.description,
  category: body.category,
  publishedAt: body.publishedAt,

  imageUrl,
  imagePublicId,

  pdfUrl,
  pdfPublicId,

  isActive: body.isActive ?? true,
};

    const news = await newsService.createNews(data);

    res.status(201).json(
      new ApiResponse(
        true,
        "News created successfully.",
        news
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Update News
|--------------------------------------------------------------------------
*/

export const updateNews = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid news ID.");
    }

    const body = updateNewsSchema.parse(req.body);
console.log(req.body);
    const existingNews = await newsService.getNewsById(id);

    if (!existingNews) {
      throw new ApiError(404, "News not found.");
    }

    const files = req.files as
      | {
          image?: Express.Multer.File[];
          pdf?: Express.Multer.File[];
        }
      | undefined;

    const data: Prisma.NewsUpdateInput = {};

    if (body.title !== undefined) {
      data.title = body.title;
    }

    if (body.description !== undefined) {
      data.description = body.description;
    }
    if (body.category !== undefined) {
  data.category = body.category;
}
    if (body.publishedAt !== undefined) {
      data.publishedAt = body.publishedAt;
    }

    if (body.isActive !== undefined) {
      data.isActive = body.isActive;
    }

    /*
    |--------------------------------------------------------------------------
    | Replace Image
    |--------------------------------------------------------------------------
    */

    if (files?.image?.[0]) {
      const uploadedImage = await uploadFile(
        files.image[0].buffer,
        "college/news/images"
      );

      if (existingNews.imagePublicId) {
        await deleteFile(existingNews.imagePublicId);
      }

      data.imageUrl = uploadedImage.secure_url;
      data.imagePublicId = uploadedImage.public_id;
    }

    /*
    |--------------------------------------------------------------------------
    | Replace PDF
    |--------------------------------------------------------------------------
    */

    if (files?.pdf?.[0]) {
      const uploadedPdf = await uploadFile(
        files.pdf[0].buffer,
        "college/news/pdfs"
      );

      if (existingNews.pdfPublicId) {
        await deleteFile(existingNews.pdfPublicId);
      }

      data.pdfUrl = uploadedPdf.secure_url;
      data.pdfPublicId = uploadedPdf.public_id;
    }

    const updatedNews = await newsService.updateNews(
      id,
      data
    );

    if (!updatedNews) {
      throw new ApiError(404, "News not found.");
    }

    res.json(
      new ApiResponse(
        true,
        "News updated successfully.",
        updatedNews.updatedNews
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Delete News
|--------------------------------------------------------------------------
*/

export const deleteNews = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid news ID.");
    }

    const news = await newsService.deleteNews(id);

    if (!news) {
      throw new ApiError(404, "News not found.");
    }

    if (news.imagePublicId) {
      await deleteFile(news.imagePublicId);
    }

    if (news.pdfPublicId) {
      await deleteFile(news.pdfPublicId);
    }

    res.json(
      new ApiResponse(
        true,
        "News deleted successfully.",
        news
      )
    );
  }
);