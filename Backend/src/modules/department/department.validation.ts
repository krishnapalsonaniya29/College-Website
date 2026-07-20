import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Create Department Validation
|--------------------------------------------------------------------------
*/

export const createDepartmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Department name must be at least 2 characters.")
    .max(150, "Department name cannot exceed 150 characters."),

  slug: z
    .string()
    .trim()
    .min(2, "Slug is required.")
    .max(150, "Slug cannot exceed 150 characters.")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can contain only lowercase letters, numbers, and hyphens."
    ),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters."),

  vision: z
    .string()
    .trim()
    .min(10, "Vision must be at least 10 characters."),

  mission: z
    .string()
    .trim()
    .min(10, "Mission must be at least 10 characters."),

  isActive: z.coerce.boolean().optional().default(true),
});

/*
|--------------------------------------------------------------------------
| Update Department Validation
|--------------------------------------------------------------------------
*/

export const updateDepartmentSchema =
  createDepartmentSchema.partial();

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export type CreateDepartmentInput = z.infer<
  typeof createDepartmentSchema
>;

export type UpdateDepartmentInput = z.infer<
  typeof updateDepartmentSchema
>;