import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Create Notice Validation
|--------------------------------------------------------------------------
*/

export const createNoticeSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters.")
    .max(255, "Title cannot exceed 255 characters."),

  description: z
    .string()
    .trim()
    .min(5, "Description must be at least 5 characters.")
    .max(10000, "Description cannot exceed 10000 characters."),

  noticeDate: z.coerce.date({
    error: "Please provide a valid notice date.",
  }),

  isPinned: z.coerce.boolean().optional().default(false),

  isActive: z.coerce.boolean().optional().default(true),
});

/*
|--------------------------------------------------------------------------
| Update Notice Validation
|--------------------------------------------------------------------------
*/

export const updateNoticeSchema = createNoticeSchema.partial();

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export type CreateNoticeInput = z.infer<typeof createNoticeSchema>;
export type UpdateNoticeInput = z.infer<typeof updateNoticeSchema>;