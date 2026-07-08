import z from "zod";

export const createRoleSchema = z.object({
    title: z.string()
        .trim()
        .min(3)
        .max(200),

    description: z.string()
        .trim()
        .max(500)
        .default(""),
    
    permissions: z.array(z.string()).default([]),
}).strict();

export const updateRoleSchema = createRoleSchema.partial();