import { z } from "zod";
import { GalleryCategory } from "@prisma/client";
console.log("Gallery validation loaded");
export const createGallerySchema = z.object({
  title: z
    .string()
    .trim()
    
    .max(255, "Title must be less than 255 characters"),

  category: z.nativeEnum(GalleryCategory),
  

  
  departmentId: z
  .union([
    z.coerce.number().int().positive(),
    z.literal(""),
    z.null(),
  ])
  .optional()
  .transform((value) => {
    if (
      value === "" ||
      value === undefined ||
      value === null
    ) {
      return null;
    }

    return Number(value);
  }),
  isActive: z
    .union([
      z.boolean(),
      z.string().transform((val) => val === "true"),
    ])
    .optional()
    .default(true),
});

export const updateGallerySchema = createGallerySchema.partial();