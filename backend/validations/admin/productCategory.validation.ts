import mongoose from "mongoose";
import { z } from "zod";

const objectIdSchema = z.string().refine(
    (value) => mongoose.Types.ObjectId.isValid(value),
    {
        message: "Invalid ObjectId",
    }
);
//query
const getCategoriesQuerySchema = z
    .object({
        status: z.enum(["active", "inactive"]).optional(),

        category: objectIdSchema.optional(),

        search: z
            .string()
            .trim()
            .max(100, "Search must not exceed 100 characters")
            .optional(),

        sort: z
            .enum([
                "created-asc",
                "created-desc",
                "position-asc",
                "position-desc",
            ])
            .optional(),

        page: z.coerce
            .number()
            .int()
            .min(1, "Page must be greater than 0")
            .optional(),

        limit: z.coerce
            .number()
            .int()
            .min(1, "Limit must be greater than 0")
            .max(100, "Limit must not exceed 100")
            .optional(),
    })
    .strict();
//get category
export const getCategoriesSchema = z.object({
    query: getCategoriesQuerySchema,
});
//create
const categoryBodySchema = z.object({
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

export const createCategorySchema = z.object({
    body: categoryBodySchema
})

export type CreateCategoryBody = z.infer<typeof categoryBodySchema>;
export type GetCategoriesQuery = z.infer<typeof getCategoriesQuerySchema>;