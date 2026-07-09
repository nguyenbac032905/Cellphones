// validators/user.validator.ts
import { z } from "zod";

export const emailSchema = z
    .email("Invalid email address")
    .max(255, "Email must not exceed 255 characters");

export const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters");

export const objectIdSchema = z
    .string()
    .regex(/^[a-f\d]{24}$/i, "Invalid role ID");

export const createUserSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, "Full name must be at least 2 characters")
        .max(100, "Full name must not exceed 100 characters"),

    email: emailSchema,

    password: passwordSchema,

    roleID: objectIdSchema,
});

export type CreateUserBody = z.infer<typeof createUserSchema>;