import z from "zod";

const emailSchema = z
    .email("Invalid email address")
    .max(255, "Email must not exceed 255 characters");

const passwordSchema = z
    .string()
    .min(6, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters");

export const updateMeSchema = z.object({
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
        .nullable().optional(),

    avatar: z
        .string()
        .url("Avatar must be a valid URL")
        .nullable().optional()
});

export type UpdateMeBody = z.infer<typeof updateMeSchema>;

export const registerSchema = z.object({
    email: emailSchema
}).strict();
export type RegisterBody = z.infer<typeof registerSchema>;

export const verifyOtpSchema = z.object({
    email: emailSchema,
    otp: z.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits")
})
export type VerifyOtpBody = z.infer<typeof verifyOtpSchema>;

export const setPasswordSchema = z.object({
    password: passwordSchema,
    fullName: z
            .string()
            .trim()
            .min(2, "Full name must be at least 2 characters")
            .max(100, "Full name must not exceed 100 characters")
})
export type SetPasswordBody = z.infer<typeof setPasswordSchema>;