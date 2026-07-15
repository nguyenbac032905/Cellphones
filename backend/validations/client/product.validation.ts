import { z } from "zod";

export const getProductsSchema = z.object({
    query: z.object({
        featured: z
        .enum(["true", "false"])
        .optional(),

        discount: z.coerce
            .number()
            .int()
            .min(0)
            .max(100)
            .optional(),

        minPrice: z.coerce
            .number()
            .min(0)
            .optional(),

        maxPrice: z.coerce
            .number()
            .min(0)
            .optional(),

        search: z
            .string()
            .trim()
            .max(100)
            .optional(),

        sort: z
            .enum([
                "newest",
                "price-asc",
                "price-desc",
                "discount-desc"
            ])
            .default("newest"),

        page: z.coerce
            .number()
            .int()
            .min(1)
            .default(1),

        limit: z.coerce
            .number()
            .int()
            .min(1)
            .max(100)
            .default(20)
    }).refine((data) => data.minPrice === undefined || data.maxPrice === undefined || data.minPrice <= data.maxPrice, {
            message: "minPrice phải nhỏ hơn hoặc bằng maxPrice",
            path: ["minPrice"]
        }
    ).strict()
});

export type GetProductsQuery = z.infer<typeof getProductsSchema>["query"];