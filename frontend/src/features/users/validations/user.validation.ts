// validators/user.validator.ts
import { z } from "zod";

const emailSchema = z
    .email("Invalid email address")
    .max(255, "Email must not exceed 255 characters");

const passwordSchema = z
    .string()
    .min(6, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters");

const objectIdSchema = z
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

export const updateUserSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, "Full name must be at least 2 characters")
        .max(100, "Full name must not exceed 100 characters")
        .optional(),

    email: emailSchema.optional(),

    password: passwordSchema.optional(),

    roleID: objectIdSchema.optional(),

    phone: z
        .string()
        .trim()
        .length(10, "Phone must be exactly 10 digits")
        .regex(/^\d+$/, "Phone must contain only digits")
        .nullable().optional(),

    accountType: z
        .enum(["user", "admin"])
        .optional(),

    status: z
        .enum(["active", "inactive"])
        .optional(),

    avatar: z
        .string()
        .url("Avatar must be a valid URL")
        .nullable().optional()
});

export type CreateUserBody = z.infer<typeof createUserSchema>;
export type UpdateUserBody = z.infer<typeof updateUserSchema>;