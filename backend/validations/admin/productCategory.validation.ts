import mongoose from "mongoose";
import { z } from "zod";

const objectIdSchema = z.string().refine(
    (value) => mongoose.Types.ObjectId.isValid(value),
    {
        message: "Invalid ObjectId",
    }
);

export const getCategoriesQuerySchema = z
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

export const getCategoriesSchema = z.object({
    query: getCategoriesQuerySchema,
});

export type GetCategoriesQuery = z.infer<typeof getCategoriesQuerySchema>;