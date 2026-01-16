import * as z from "zod";

export const LoginFormSchema = z.object({
  emailAddress: z
    .string()
    .email("Please enter a valid email.")
    .max(64, "Be at most 64 characters long")
    .trim(),
  password: z
    .string()
    .min(12, "Be at least 12 characters long")
    .max(64, "Be at most 64 characters long")
    .regex(/[a-z]/, "Contain at least one letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Contain at least one number.")
    .regex(/[^a-zA-Z0-9]/, "Contain at least one special character.")
    .trim(),
});

export const SignUpFormSchema = LoginFormSchema.extend({
  username: z
    .string()
    .min(3, "Be at least 3 characters long")
    .max(32, "Be at most 32 characters long")
    .regex(/^[a-zA-Z0-9-]+$/, "Contain only letters, numbers and hyphens.")
    .trim(),
});

export type LoginFormData = z.TypeOf<typeof LoginFormSchema>;
export type SignUpFormData = z.TypeOf<typeof SignUpFormSchema>;
