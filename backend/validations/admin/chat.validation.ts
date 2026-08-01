import mongoose from "mongoose";
import z from "zod";

const objectIdSchema = z
    .string()
    .refine(
        (value) => mongoose.Types.ObjectId.isValid(value),
        "Invalid ObjectId"
    );
export const roomIDSchema = z.object({
    params: z.object({
        roomID: objectIdSchema
    }).strict()
});