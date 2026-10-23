import mongoose from "mongoose";
import { z } from "zod";

const objectIdSchema = z
    .string()
    .refine(
        value => mongoose.Types.ObjectId.isValid(value),
        "Invalid ObjectId"
    );

const ratingSchema = z.coerce
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5")
    .refine(value => Number.isInteger(value * 2), "Rating must be in steps of 0.5");

const contentSchema = z
    .string()
    .trim()
    .min(1, "Content is required")
    .max(1000, "Content must be at most 1000 characters");

const productParamsSchema = z.object({
    productID: objectIdSchema
}).strict();

// POST /reviews/ratings   body: { productIDs: string[] }
export const getRatingsSchema = z.object({
    body: z.object({
        productIDs: z
            .array(objectIdSchema)
            .min(1, "At least one product ID is required")
            .max(50, "Maximum 50 products")
    }).strict()
});

// GET /reviews/product/:productID
export const getReviewsSchema = z.object({
    params: productParamsSchema,
    query: z.object({
        star: z.enum(["1", "2", "3", "4", "5"]).optional(),
        page: z.coerce.number().int().min(1).default(1),
        limit: z.coerce.number().int().min(1).max(50).default(10)
    }).strict()
});

// GET /reviews/product/:productID/summary  &  /me
export const getProductReviewParamsSchema = z.object({
    params: productParamsSchema
});

// POST /reviews
export const createReviewSchema = z.object({
    body: z.object({
        productID: objectIdSchema,
        rating: ratingSchema,
        content: contentSchema
    }).strict()
});

// PATCH /reviews/:reviewID
export const updateReviewSchema = z.object({
    params: z.object({
        reviewID: objectIdSchema
    }).strict(),
    body: z.object({
        rating: ratingSchema,
        content: contentSchema
    }).strict()
});

// DELETE /reviews/:reviewID
export const deleteReviewSchema = z.object({
    params: z.object({
        reviewID: objectIdSchema
    }).strict()
});

export type GetReviewsQuery = z.infer<typeof getReviewsSchema>["query"];
export type CreateReviewBody = z.infer<typeof createReviewSchema>["body"];
export type UpdateReviewBody = z.infer<typeof updateReviewSchema>["body"];
