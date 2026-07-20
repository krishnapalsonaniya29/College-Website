import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Create Faculty Validation
|--------------------------------------------------------------------------
*/

export const createFacultySchema = z.object({
  departmentId: z.coerce
    .number()
    .int()
    .positive("Department is required."),

  name: z
    .string()
    .trim()
    .min(2, "Faculty name must be at least 2 characters.")
    .max(150, "Faculty name cannot exceed 150 characters."),

  designation: z
    .string()
    .trim()
    .min(2, "Designation is required.")
    .max(100, "Designation cannot exceed 100 characters."),

  qualification: z
    .string()
    .trim()
    .min(2, "Qualification is required.")
    .max(255, "Qualification cannot exceed 255 characters."),

  experience: z.coerce
    .number()
    .int()
    .min(0, "Experience cannot be negative."),

  email: z
    .string()
    .trim()
    .email("Invalid email address."),

  isHOD: z.coerce
    .boolean()
    .optional()
    .default(false),

  isActive: z.coerce
    .boolean()
    .optional()
    .default(true),
});

/*
|--------------------------------------------------------------------------
| Update Faculty Validation
|--------------------------------------------------------------------------
*/

export const updateFacultySchema =
  createFacultySchema.partial();

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export type CreateFacultyInput = z.infer<
  typeof createFacultySchema
>;

export type UpdateFacultyInput = z.infer<
  typeof updateFacultySchema
>;