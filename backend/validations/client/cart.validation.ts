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
    variantID: objectIdSchema,
    quantity: z.coerce
        .number()
        .int("Quantity must be an integer")
        .min(1, "Quantity must be greater than 0")
}).strict();
export const cartItemSchema = z.object({
    body: itemSchema
});
// Một dòng giỏ hàng được định danh bằng variantID
export const deleteItemSchema = z.object({
    body: z.object({
        variantID: objectIdSchema
    }).strict()
})
export const bulkDeleteItemSchema = z.object({
    body: z.object({
        variantIDs: z.array(objectIdSchema).min(1, "At least one variant ID is required")
    }).strict()
});

export type CartItemBody = z.infer<typeof cartItemSchema>["body"];

export type DeleteCartBody = z.infer<typeof deleteItemSchema>["body"];

export type BulkDeleteBody = z.infer<typeof bulkDeleteItemSchema>["body"];
