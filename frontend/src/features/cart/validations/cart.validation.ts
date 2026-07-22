import { z } from "zod";

export const cartItemSchema = z.object({
    productID: z
        .string()
        .regex(/^[a-fA-F0-9]{24}$/, "Invalid MongoDB ObjectId"),
    quantity: z.coerce
        .number()
        .int("Quantity must be an integer")
        .min(1, "Quantity must be greater than 0"),
}).strict();

export type CartItemBody = z.infer<typeof cartItemSchema>;