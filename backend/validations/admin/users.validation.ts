import mongoose from "mongoose";
import { z } from "zod";

// common
const passwordSchema = z
    .string()
    .trim()
    .min(6, { error: "Password must be at least 6 characters" })
    .max(100, { error: "Password must not exceed 100 characters" });

const emailSchema = z
    .email({ error: "Invalid email address" })
    .max(255, { error: "Email must not exceed 255 characters" });

export const objectIdSchema = z.string().refine(
    (value) => mongoose.Types.ObjectId.isValid(value),"Invalid ObjectId"
);

export const getUsersServiceSchema = z.object({
    query: z.object({
        status: z.enum(["active", "inactive"]).optional(),

        accountType: z.enum(["admin", "user"]).optional(),

        search: z
            .string()
            .trim()
            .min(1)
            .optional(),

        page: z.coerce
            .number()
            .int()
            .min(1)
            .optional(),

        limit: z.coerce
            .number()
            .int()
            .min(1)
            .max(100)
            .optional(),
    })
});

export const createUserSchema = z.object({
    body: z.object({
        fullName: z
            .string()
            .trim()
            .min(2, { error: "Full name must be at least 2 characters" })
            .max(100, { error: "Full name must not exceed 100 characters" }),

        email: emailSchema,

        password: passwordSchema,

        roleID: objectIdSchema
    }),
});

export type GetUsersServiceInput = z.infer<typeof getUsersServiceSchema>;