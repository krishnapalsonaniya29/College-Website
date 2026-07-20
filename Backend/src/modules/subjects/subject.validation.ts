import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Create Subject Validation
|--------------------------------------------------------------------------
*/

export const createSubjectSchema = z.object({
  programId: z.coerce
    .number()
    .int()
    .positive("Program is required."),

  subjectCode: z
    .string()
    .trim()
    .min(2, "Subject code must be at least 2 characters.")
    .max(50, "Subject code cannot exceed 50 characters."),

  subjectName: z
    .string()
    .trim()
    .min(2, "Subject name must be at least 2 characters.")
    .max(255, "Subject name cannot exceed 255 characters."),

  isActive: z.coerce
    .boolean()
    .optional()
    .default(true),
});

/*
|--------------------------------------------------------------------------
| Update Subject Validation
|--------------------------------------------------------------------------
*/

export const updateSubjectSchema =
  createSubjectSchema.partial();

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export type CreateSubjectInput = z.infer<
  typeof createSubjectSchema
>;

export type UpdateSubjectInput = z.infer<
  typeof updateSubjectSchema
>;