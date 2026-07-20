import { z } from "zod";
import { NewsCategory } from "@prisma/client";
export const createNewsSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(200, "Title cannot exceed 200 characters."),

  description: z
    .string()
    .trim()
    .min(1, "Description must be at least 1 characters.")
    .max(5000, "Description cannot exceed 5000 characters."),

  publishedAt: z.coerce.date({
    message: "Invalid published date.",
  }),

  category: z.nativeEnum(NewsCategory).default("NEWS"),

  isActive: z.coerce.boolean().optional(),
});

export const updateNewsSchema =
  createNewsSchema.partial();