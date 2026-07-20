import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";

import {
  uploadImage,
  deleteImage,
} from "../../utils/uploadToCloudinary";

import * as noticeService from "./notice.service";
import {
  createNoticeSchema,
  updateNoticeSchema,
} from "./notice.validation";

/*
|--------------------------------------------------------------------------
| Get Public Notices
|--------------------------------------------------------------------------
*/

export const getNotices = asyncHandler(
  async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await noticeService.getNotices(page, limit);

    res.json(
      new ApiResponse(
        true,
        "Notices fetched successfully.",
        result
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get All Notices (Admin)
|--------------------------------------------------------------------------
*/

export const getAdminNotices = asyncHandler(
  async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await noticeService.getAdminNotices(
      page,
      limit
    );

    res.json(
      new ApiResponse(
        true,
        "Admin notices fetched successfully.",
        result
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Notice By ID
|--------------------------------------------------------------------------
*/

export const getNoticeById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid notice ID.");
    }

    const notice = await noticeService.getNoticeById(id);

    if (!notice) {
      throw new ApiError(404, "Notice not found.");
    }

    res.json(
      new ApiResponse(
        true,
        "Notice fetched successfully.",
        notice
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Create Notice
|--------------------------------------------------------------------------
*/

export const createNotice = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createNoticeSchema.parse(req.body);

    const data: Prisma.NoticeCreateInput = {
      ...body,
    };

    if (req.file) {
      const uploadedPdf = await uploadImage(
        req.file.buffer,
        "college/notices"
      );

      data.pdfUrl = uploadedPdf.secure_url;
      data.pdfPublicId = uploadedPdf.public_id;
    }

    const notice = await noticeService.createNotice(data);

    res.status(201).json(
      new ApiResponse(
        true,
        "Notice created successfully.",
        notice
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Update Notice
|--------------------------------------------------------------------------
*/

export const updateNotice = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid notice ID.");
    }

    const body = updateNoticeSchema.parse(req.body);

    const data: Prisma.NoticeUpdateInput = {
      ...body,
    };

    if (req.file) {
      const uploadedPdf = await uploadImage(
        req.file.buffer,
        "college/notices"
      );

      data.pdfUrl = uploadedPdf.secure_url;
      data.pdfPublicId = uploadedPdf.public_id;
    }

    const result = await noticeService.updateNotice(
      id,
      data
    );

    if (!result) {
      throw new ApiError(404, "Notice not found.");
    }

    if (req.file && result.oldNotice.pdfPublicId) {
      await deleteImage(result.oldNotice.pdfPublicId);
    }

    res.json(
      new ApiResponse(
        true,
        "Notice updated successfully.",
        result.updatedNotice
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Delete Notice
|--------------------------------------------------------------------------
*/

export const deleteNotice = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid notice ID.");
    }

    const notice = await noticeService.deleteNotice(id);

    if (!notice) {
      throw new ApiError(404, "Notice not found.");
    }

    if (notice.pdfPublicId) {
      await deleteImage(notice.pdfPublicId);
    }

    res.json(
      new ApiResponse(
        true,
        "Notice deleted successfully.",
        notice
      )
    );
  }
);