import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Create Hero Slide
|--------------------------------------------------------------------------
*/

export const createHeroSlideSchema = z.object({
  title: z
    .string()
    .trim()
    .max(100, "Title cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  subtitle: z
    .string()
    .trim()
    .max(255, "Subtitle cannot exceed 255 characters.")
    .optional()
    .or(z.literal("")),

  buttonText: z
    .string()
    .trim()
    .max(50, "Button text cannot exceed 50 characters.")
    .optional()
    .or(z.literal("")),

  buttonLink: z
    .string()
    .trim()
    .max(255, "Button link cannot exceed 255 characters.")
    .optional()
    .or(z.literal("")),

  displayOrder: z.coerce
    .number()
    .int()
    .nonnegative("Display order cannot be negative.")
    .default(0),

  isActive: z.coerce
    .boolean()
    .default(true),
});

/*
|--------------------------------------------------------------------------
| Update Hero Slide
|--------------------------------------------------------------------------
*/

export const updateHeroSlideSchema = createHeroSlideSchema.partial();

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export type CreateHeroSlideInput = z.infer<
  typeof createHeroSlideSchema
>;

export type UpdateHeroSlideInput = z.infer<
  typeof updateHeroSlideSchema
>;