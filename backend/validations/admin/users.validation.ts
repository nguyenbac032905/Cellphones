import { z } from "zod";

export const getUsersServiceSchema = z.object({
    query: z.object({
        status: z.enum(["active", "inactive"]).optional(),

        accountType: z.enum(["admin", "user"]).optional(),

        search: z
            .string()
            .trim()
            .min(1)
            .optional(),

        page: z.coerce
            .number()
            .int()
            .min(1)
            .optional(),

        limit: z.coerce
            .number()
            .int()
            .min(1)
            .max(100)
            .optional(),
    })
})

export type GetUsersServiceInput = z.infer<typeof getUsersServiceSchema>;