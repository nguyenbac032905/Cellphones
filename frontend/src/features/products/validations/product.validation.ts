import { z } from "zod";

export const imageSchema = z.object({
    url: z.string().url("Invalid image URL"),
    isMain: z.boolean().optional()
});

export const createProductSchema = z.object({
    title: z.string().min(3).max(200),
    product_category_id: z.string().nullable().optional(),
    description: z.string().max(2000).optional(),
    content: z.string().optional(),
    price: z.number().min(0),
    discountPercentage: z.number().min(0).max(100).optional(),
    stock: z.number().int().min(0).optional(),
    images: z.array(imageSchema).max(10).optional(),
    status: z.enum(["active", "inactive"]).optional(),
    position: z.number().int().min(0).optional(),
    featured: z.boolean().optional()
});

export const updateProductSchema = createProductSchema.partial();