import { z } from "zod";
import { Semester } from "@prisma/client";

export const createSyllabusSchema = z.object({
  subjectId: z.coerce
    .number()
    .int()
    .positive("Subject is required."),

  semester: z.nativeEnum(Semester, {
    errorMap: () => ({
      message: "Invalid semester.",
    }),
  }),

  isActive: z.coerce
    .boolean()
    .optional()
    .default(true),
});

export const updateSyllabusSchema =
  createSyllabusSchema.partial();

export type CreateSyllabusInput = z.infer<
  typeof createSyllabusSchema
>;

export type UpdateSyllabusInput = z.infer<
  typeof updateSyllabusSchema
>;