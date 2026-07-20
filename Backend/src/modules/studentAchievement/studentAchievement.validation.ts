import { z } from "zod";

export const createStudentAchievementSchema = z.object({
  name: z.string().min(2).max(100),

  email: z.string().email().optional(),

  course: z.string().min(2).max(100),

  achievement: z.string().min(2).max(255),

  description: z.string().min(5),

  achievementDate: z.coerce.date(),

  isActive: z
    .union([z.boolean(), z.string()])
    .optional()
    .transform((value) => {
      if (typeof value === "boolean") return value;
      return value === "true";
    }),
});

export const updateStudentAchievementSchema =
  createStudentAchievementSchema.partial();