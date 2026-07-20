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
        email: emailSchema
    }).strict(),
});
//verify-token
export const verifyTokenSchema = z.object({
    body: z.object({
        email: emailSchema,
        otp: z.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits")
    }).strict()
});
export const setPasswordSchema = z.object({
    body: z.object({
        password: passwordSchema,
        fullName: z
                .string()
                .trim()
                .min(2, "Full name must be at least 2 characters")
                .max(100, "Full name must not exceed 100 characters")
    }).strict()
});

export type RegisterBody = z.infer<typeof registerSchema>["body"];
export type VerifyBody = z.infer<typeof verifyTokenSchema>["body"];
export type SetPasswordBody = z.infer<typeof setPasswordSchema>["body"];