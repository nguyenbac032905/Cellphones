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

const objectIdSchema = z.string().refine(
    (value) => mongoose.Types.ObjectId.isValid(value),"Invalid ObjectId"
);

const bodySchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, { error: "Full name must be at least 2 characters" })
        .max(100, { error: "Full name must not exceed 100 characters" }),

    email: emailSchema,

    password: passwordSchema,

    roleID: objectIdSchema
}).strict();
//query
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
//params
export const userIDParamsSchema = z.object({
    params: z.object({
        userID: objectIdSchema
    }).strict()
});
//create
export const createUserSchema = z.object({
    body: bodySchema,
});
//update
export const updateUserSchema = z.object({
    params: z.object({
        userID: objectIdSchema
    }).strict(),

    body: z.object({
        fullName: z
            .string()
            .trim()
            .min(2, "Full name must be at least 2 characters")
            .max(100, "Full name must not exceed 100 characters").optional(),

        email: emailSchema.optional(),

        password: passwordSchema.optional(),

        roleID: objectIdSchema.optional(),

        phone: z
            .string()
            .trim()
            .length(10, "Phone must be exactly 10 digits")
            .regex(/^\d+$/, "Phone must contain only digits")
            .nullable().optional(),

        accountType: z.enum(["user", "admin"]).optional(),

        status: z.enum(["active", "inactive"]).optional(),

        avatar: z.string().url("Avatar must be a valid URL").nullable().optional()
    }).partial().strict()
});

export type GetUsersServiceInput = z.infer<typeof getUsersServiceSchema>["query"];
export type CreateUserBody = z.infer<typeof createUserSchema>["body"];
export type UpdateUserBody = z.infer<typeof updateUserSchema>["body"];