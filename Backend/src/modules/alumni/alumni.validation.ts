import { z } from "zod";

export const createAlumniSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters."),

  batch: z.coerce
    .number()
    .int("Batch must be an integer.")
    .min(1900, "Invalid batch year.")
    .max(new Date().getFullYear(), "Batch year cannot be in the future."),

  course: z
    .string()
    .trim()
    .min(2, "Course is required.")
    .max(100, "Course cannot exceed 100 characters."),

  profession: z
    .string()
    .trim()
    .min(2, "Profession is required.")
    .max(100, "Profession cannot exceed 100 characters."),

  company: z
    .string()
    .trim()
    .max(100, "Company name cannot exceed 100 characters.")
    .optional(),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message cannot exceed 2000 characters."),

  isActive: z.coerce.boolean().optional(),
});

export const updateAlumniSchema = createAlumniSchema.partial();