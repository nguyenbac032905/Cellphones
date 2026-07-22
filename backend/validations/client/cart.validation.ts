import mongoose from "mongoose";
import { z } from "zod";

const objectIdSchema = z
    .string()
    .refine(
        value => mongoose.Types.ObjectId.isValid(value),
        "Invalid ObjectId"
    );
const itemSchema = z.object({
    productID: objectIdSchema,
    quantity: z.coerce
        .number()
        .int("Quantity must be an integer")
        .min(1, "Quantity must be greater than 0")
}).strict();
export const cartItemSchema = z.object({
    body: itemSchema
});
export const deleteItemSchema = z.object({
    body: z.object({
        productID: objectIdSchema
    }).strict()
})

export type CartItemBody = z.infer<typeof cartItemSchema>["body"];

export type DeleteCartBody = z.infer<typeof deleteItemSchema>["body"];