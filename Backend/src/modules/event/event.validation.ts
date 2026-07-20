import { z } from "zod";

export const createEventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title must be at least 3 characters.")
    .max(200, "Title cannot exceed 200 characters."),

  description: z
    .string()
    .trim()
    .min(1, "Description must be at least 10 characters.")
    .max(5000, "Description cannot exceed 5000 characters."),

  eventDate: z.coerce.date({
    message: "Invalid event date.",
  }),

  isActive: z.coerce.boolean().optional(),
});

export const updateEventSchema =
  createEventSchema.partial();