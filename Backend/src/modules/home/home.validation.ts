import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Home Configuration Validation
|--------------------------------------------------------------------------
*/

export const updateHomeConfigSchema = z.object({
  directorName: z
    .string()
    .trim()
    .min(2, "Director name must be at least 2 characters.")
    .max(100, "Director name cannot exceed 100 characters."),

  directorMessage: z
    .string()
    .trim()
    .min(20, "Director message must be at least 20 characters.")
    .max(5000, "Director message cannot exceed 5000 characters."),

  totalStudents: z
    .coerce
    .number()
    .int()
    .min(0, "Total students cannot be negative."),

  ugStudents: z
    .coerce
    .number()
    .int()
    .min(0, "UG students cannot be negative."),

  pgStudents: z
    .coerce
    .number()
    .int()
    .min(0, "PG students cannot be negative."),

  girls: z
    .coerce
    .number()
    .int()
    .min(0, "Girls count cannot be negative."),

  boys: z
    .coerce
    .number()
    .int()
    .min(0, "Boys count cannot be negative."),

  academicSession: z
    .string()
    .trim()
    .regex(
      /^\d{4}-\d{2}$/,
      "Academic session must be in the format YYYY-YY (e.g. 2025-26)."
    ),

  thought: z
    .string()
    .trim()
    .min(5, "Thought must be at least 5 characters.")
    .max(1000, "Thought cannot exceed 1000 characters."),

  thoughtAuthor: z
    .string()
    .trim()
    .min(2, "Author name must be at least 2 characters.")
    .max(100, "Author name cannot exceed 100 characters."),
});

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export type UpdateHomeConfigInput = z.infer<
  typeof updateHomeConfigSchema
>;