import z from "zod";
const objectIdSchema = z
    .string()
    .regex(/^[a-f\d]{24}$/i, "Invalid role ID");

export const createCategorySchema = z.object({
    title: z
        .string()
        .trim()
        .min(2, "Title must be at least 2 characters")
        .max(100, "Title must not exceed 100 characters"),

    parent_id: objectIdSchema
        .nullable()
        .optional(),

    description: z
        .string()
        .trim()
        .max(1000, "Description must not exceed 1000 characters")
        .optional(),

    thumbnail: z
        .string()
        .trim()
        .url("Thumbnail must be a valid URL")
        .optional(),

    status: z
        .enum(["active", "inactive"])
        .optional(),

    position: z
        .coerce
        .number()
        .int("Position must be an integer")
        .min(0, "Position must be greater than or equal to 0")
        .optional()
}).strict();

export type CreateCategoryBody = z.infer<typeof createCategorySchema>;