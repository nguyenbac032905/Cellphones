import mongoose from "mongoose";
import z from "zod";

// common
const passwordSchema = z
    .string()
    .trim()
    .min(6, { error: "Password must be at least 6 characters" })
    .max(100, { error: "Password must not exceed 100 characters" });

const emailSchema = z
    .email({ error: "Invalid email address" })
    .max(255, { error: "Email must not exceed 255 characters" });

export const objectIdSchema = z.string().refine(
    (value) => mongoose.Types.ObjectId.isValid(value),"Invalid ObjectId"
);

// login
export const loginSchema = z.object({
    body: z.object({
        email: emailSchema,
        password: passwordSchema,
    }),
});

// register
export const registerSchema = z.object({
    body: z.object({
        fullName: z
            .string()
            .trim()
            .min(2, { error: "Full name must be at least 2 characters" })
            .max(100, { error: "Full name must not exceed 100 characters" }),

        email: emailSchema,

        password: passwordSchema,

        roleID: objectIdSchema
    }),
});
//update me
export const updateMeSchema = z.object({
    body: z.object({
        fullName: z
            .string()
            .trim()
            .min(2, "Full name must be at least 2 characters")
            .max(100, "Full name must not exceed 100 characters")
            .optional(),

        email: emailSchema.optional(),

        password: passwordSchema.optional(),

        phone: z
            .string()
            .trim()
            .length(10, "Phone must be exactly 10 digits")
            .regex(/^\d+$/, "Phone must contain only digits")
            .nullable()
            .optional(),

        avatar: z
            .string()
            .url("Avatar must be a valid URL")
            .nullable()
            .optional(),
    }).partial().strict(),
});

export type UpdateMeBody = z.infer<typeof updateMeSchema>["body"];