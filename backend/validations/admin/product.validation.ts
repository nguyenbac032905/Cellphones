import z from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

export const imageSchema = z.object({
    url: z.string().regex(urlRegex, "Invalid image URL"),
    isMain: z.boolean().optional()
}).strict();

export const createProductSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(200, "Title must not exceed 200 characters"),

    product_category_id: z
        .string()
        .regex(objectIdRegex, "Invalid product category ID")
        .nullable()
        .optional(),

    description: z
        .string()
        .trim()
        .max(2000, "Description must not exceed 2000 characters")
        .optional(),

    content: z
        .string()
        .trim()
        .optional(),

    price: z.coerce
        .number()
        .min(0, "Price must be greater than or equal to 0"),

    discountPercentage: z.coerce
        .number()
        .min(0, "Discount percentage must be at least 0")
        .max(100, "Discount percentage must not exceed 100")
        .optional(),

    stock: z.coerce
        .number()
        .int("Stock must be an integer")
        .min(0, "Stock must be greater than or equal to 0")
        .optional(),

    images: z
        .array(imageSchema)
        .max(10, "Maximum 10 images allowed")
        .optional(),
    status: z
        .enum(["active", "inactive"])
        .optional(),
    position: z.coerce
        .number()
        .int("Position must be an integer")
        .min(0, "Position must be greater than or equal to 0")
        .optional(),

    featured: z.boolean().optional()
}).strict();

export const updateProductSchema = createProductSchema.partial();