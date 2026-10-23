import mongoose from "mongoose";
import z from "zod";

const objectIdSchema = z
    .string()
    .refine(
        (value) => mongoose.Types.ObjectId.isValid(value),
        "Invalid ObjectId"
    );
export const addCouponSchema = z.object({
    body: z.object({
        couponID: objectIdSchema
    }).strict()
});

export type AddCouponBody = z.infer<typeof addCouponSchema>["body"];

export const bestCouponSchema = z.object({
    body: z.object({
        products: z.array(
            z.object({
                productID: objectIdSchema,
                quantity: z.number().int().min(1),
            }).strict()
        ).min(1),
    }).strict()
});

export type BestCouponBody = z.infer<typeof bestCouponSchema>["body"];