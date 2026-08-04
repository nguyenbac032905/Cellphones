import { z } from "zod";

const orderStatusEnum = [
    "PENDING",
    "PROCESSING",
    "SHIPPED",
    "DELIVERING",
    "DELIVERED",
    "CANCELLED",
    "RETURNED",
] as const;

const orderSortEnum = [
    "created-desc",
    "created-asc",
    "price-desc",
    "price-asc",
] as const;

export const getOrdersQuerySchema = z.object({
    query: z.object({
        orderStatus: z
            .enum(orderStatusEnum)
            .optional(),

        fromDate: z
            .iso.datetime()
            .optional(),

        toDate: z
            .iso.datetime()
            .optional(),

        sort: z
            .enum(orderSortEnum)
            .optional(),

        page: z
            .coerce
            .number()
            .int()
            .min(1)
            .optional(),

        limit: z
            .coerce
            .number()
            .int()
            .min(1)
            .max(20)
            .optional(),
    }).strict(),
});

export type GetOrdersQuery = z.infer<typeof getOrdersQuerySchema>["query"];