import { z } from "zod";

export const saleQuerySchema = z.object({
    query: z .object({
        type: z.enum(["week", "month", "year"]).default("week"),
    }).strict()
});

export type SaleQuery = z.infer<typeof saleQuerySchema>["query"];