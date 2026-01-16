import * as z from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(32, "Username must be at most 32 characters.")
    .regex(/^[a-zA-Z0-9-]+$/, "Only contain letters, numbers or hyphen '-'"),
  password: z
    .string()
    .min(12, "Password must be at least 12 characters.")
    .max(64, "Password must be at most 64 characters.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one symbol"),
});
