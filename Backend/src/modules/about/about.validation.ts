import { z } from "zod";

/*
|--------------------------------------------------------------------------
| About Validation
|--------------------------------------------------------------------------
*/

export const updateAboutSchema = z.object({
  instituteName: z
    .string()
    .trim()
    .min(2, "Institute name must be at least 2 characters.")
    .max(200, "Institute name cannot exceed 200 characters."),

  about: z
    .string()
    .trim()
    .min(20, "About section must be at least 20 characters.")
    .max(10000, "About section cannot exceed 10000 characters."),

  motto: z
    .string()
    .trim()
    .min(2, "Motto must be at least 2 characters.")
    .max(500, "Motto cannot exceed 500 characters."),

  vision: z
    .string()
    .trim()
    .min(20, "Vision must be at least 20 characters.")
    .max(5000, "Vision cannot exceed 5000 characters."),

  mission: z
    .string()
    .trim()
    .min(20, "Mission must be at least 20 characters.")
    .max(5000, "Mission cannot exceed 5000 characters."),

  objectives: z
    .string()
    .trim()
    .min(20, "Objectives must be at least 20 characters.")
    .max(5000, "Objectives cannot exceed 5000 characters."),

  principalName: z
    .string()
    .trim()
    .min(2, "Principal name must be at least 2 characters.")
    .max(100, "Principal name cannot exceed 100 characters."),

  principalMessage: z
    .string()
    .trim()
    .min(20, "Principal message must be at least 20 characters.")
    .max(10000, "Principal message cannot exceed 10000 characters."),
});

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export type UpdateAboutInput = z.infer<typeof updateAboutSchema>;