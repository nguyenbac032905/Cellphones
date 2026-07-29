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