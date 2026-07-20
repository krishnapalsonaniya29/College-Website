import { z } from "zod";

export const createSportsAchievementSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(200, "Title cannot exceed 200 characters."),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .max(5000, "Description cannot exceed 5000 characters."),

  achievementDate: z.coerce.date({
    message: "Invalid achievement date.",
  }),

  isActive: z.coerce.boolean().optional(),
});

export const updateSportsAchievementSchema =
  createSportsAchievementSchema.partial();