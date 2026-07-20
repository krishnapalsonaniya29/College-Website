import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

import {
  uploadFile,
  deleteFile,
} from "../../utils/uploadToCloudinary";

import * as eventService from "./event.service";

import {
  createEventSchema,
  updateEventSchema,
} from "./event.validation";

/*
|--------------------------------------------------------------------------
| Get Public Events
|--------------------------------------------------------------------------
*/

export const getEvents = asyncHandler(
  async (_req: Request, res: Response) => {
    const events = await eventService.getEvents();

    res.json(
      new ApiResponse(
        true,
        "Events fetched successfully.",
        events
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Admin Events
|--------------------------------------------------------------------------
*/

export const getAdminEvents = asyncHandler(
  async (_req: Request, res: Response) => {
    const events = await eventService.getAdminEvents();

    res.json(
      new ApiResponse(
        true,
        "Events fetched successfully.",
        events
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Get Event By ID
|--------------------------------------------------------------------------
*/

export const getEventById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid event ID.");
    }

    const event = await eventService.getEventById(id);

    if (!event) {
      throw new ApiError(404, "Event not found.");
    }

    res.json(
      new ApiResponse(
        true,
        "Event fetched successfully.",
        event
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Create Event
|--------------------------------------------------------------------------
*/

export const createEvent = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createEventSchema.parse(req.body);

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
        "college/events/images"
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
        "college/events/pdfs"
      );

      pdfUrl = uploadedPdf.secure_url;
      pdfPublicId = uploadedPdf.public_id;
    }

    const data: Prisma.EventCreateInput = {
      title: body.title,
      description: body.description,
      eventDate: body.eventDate,

      imageUrl,
      imagePublicId,

      pdfUrl,
      pdfPublicId,

      isActive: body.isActive ?? true,
    };

    const event = await eventService.createEvent(data);

    res.status(201).json(
      new ApiResponse(
        true,
        "Event created successfully.",
        event
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Update Event
|--------------------------------------------------------------------------
*/

export const updateEvent = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid event ID.");
    }

    const body = updateEventSchema.parse(req.body);

    const result = await eventService.getEventById(id);

    if (!result) {
      throw new ApiError(404, "Event not found.");
    }

    const files = req.files as
      | {
          image?: Express.Multer.File[];
          pdf?: Express.Multer.File[];
        }
      | undefined;

    const data: Prisma.EventUpdateInput = {};

    if (body.title !== undefined) {
      data.title = body.title;
    }

    if (body.description !== undefined) {
      data.description = body.description;
    }

    if (body.eventDate !== undefined) {
      data.eventDate = body.eventDate;
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
        "college/events/images"
      );

      if (result.imagePublicId) {
        await deleteFile(result.imagePublicId);
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
        "college/events/pdfs"
      );

      if (result.pdfPublicId) {
        await deleteFile(result.pdfPublicId);
      }

      data.pdfUrl = uploadedPdf.secure_url;
      data.pdfPublicId = uploadedPdf.public_id;
    }

    const updatedEvent = await eventService.updateEvent(
      id,
      data
    );

    if (!updatedEvent) {
      throw new ApiError(404, "Event not found.");
    }

    res.json(
      new ApiResponse(
        true,
        "Event updated successfully.",
        updatedEvent.updatedEvent
      )
    );
  }
);

/*
|--------------------------------------------------------------------------
| Delete Event
|--------------------------------------------------------------------------
*/

export const deleteEvent = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid event ID.");
    }

    const event = await eventService.deleteEvent(id);

    if (!event) {
      throw new ApiError(404, "Event not found.");
    }

    if (event.imagePublicId) {
      await deleteFile(event.imagePublicId);
    }

    if (event.pdfPublicId) {
      await deleteFile(event.pdfPublicId);
    }
 
    res.json(
      new ApiResponse(
        true,
        "Event deleted successfully.",
        event
      )
    );
  }
);