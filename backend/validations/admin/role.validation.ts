import z from "zod";

export const createRoleSchema = z.object({
    body: z.object({
        title: z.string()
            .trim()
            .min(3, "Title must be at least 3 characters")
            .max(200, "Title must not exceed 200 characters"),

        description: z.string()
            .trim()
            .max(500, "Description must not exceed 500 characters")
            .optional(),

        permissions: z.array(z.string())
            .optional(),
    }).strict(),
});
export type CreateRoleBody = z.infer<typeof createRoleSchema>["body"];