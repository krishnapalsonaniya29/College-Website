import { z } from "zod";

export const createAdmissionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(200, "Title cannot exceed 200 characters."),

  admissionDate: z.coerce.date({
    message: "Invalid admission date.",
  }),

  isActive: z.coerce.boolean().optional(),
});

export const updateAdmissionSchema =
  createAdmissionSchema.partial();