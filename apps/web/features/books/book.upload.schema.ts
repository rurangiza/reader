import * as z from "zod";

export const bookChapterSchema = z.object({
  content: z.string().min(3, "Be at least 3 characters long").trim(),
  number: z.number(),
  title: z.string().min(3, "Be at least 3 characters long").trim(),
});

export const bookUploadSchema = z.object({
  chapters: z.array(bookChapterSchema).min(1, "At least 1 chapter is required"),
  title: z
    .string()
    .min(3, "Be at least 3 characters long")
    .max(64, "Be at most 255 characters long")
    .trim(),
});

export type BookChapterFormData = z.TypeOf<typeof bookChapterSchema>;
export type BookUploadFormData = z.TypeOf<typeof bookUploadSchema>;
