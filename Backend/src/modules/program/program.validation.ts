import { ProgramCategory } from "@prisma/client";
import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Create Program Validation
|--------------------------------------------------------------------------
*/

export const createProgramSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Program name must be at least 2 characters.")
    .max(150, "Program name cannot exceed 150 characters."),

  category: z.nativeEnum(ProgramCategory, {
    errorMap: () => ({
      message: "Invalid program category.",
    }),
  }),

  isActive: z
    .coerce
    .boolean()
    .optional()
    .default(true),
});

/*
|--------------------------------------------------------------------------
| Update Program Validation
|--------------------------------------------------------------------------
*/

export const updateProgramSchema =
  createProgramSchema.partial();

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export type CreateProgramInput = z.infer<
  typeof createProgramSchema
>;

export type UpdateProgramInput = z.infer<
  typeof updateProgramSchema
>;