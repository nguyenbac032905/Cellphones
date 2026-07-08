import mongoose from "mongoose";
import z from "zod";

const roleBodySchema = z.object({
    title: z.string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(200, "Title must not exceed 200 characters"),

    description: z.string()
        .trim()
        .max(500, "Description must not exceed 500 characters")
        .optional(),

    permissions: z.array(z.string())
        .optional(),
}).strict();

const objectIdSchema = z
    .string()
    .refine(
        (value) => mongoose.Types.ObjectId.isValid(value),
        "Invalid ObjectId"
    );

export const roleIDSchema = z.object({
    params: z.object({
        roleID: objectIdSchema
    }).strict()
});

export const createRoleSchema = z.object({
    body: roleBodySchema,
});

export const updateRoleSchema = z.object({
    params: z.object({
        roleID: objectIdSchema
    }).strict(),
    body: roleBodySchema.partial(),
});

export type CreateRoleBody = z.infer<typeof createRoleSchema>["body"];
export type UpdateRoleBody = z.infer<typeof updateRoleSchema>["body"];