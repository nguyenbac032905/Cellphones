import { z } from "zod";

export const getDistrictsSchema = z.object({
    params: z.object({
        provinceID: z.coerce
                    .number()
                    .int()
                    .positive()
    }).strict()
});

export const getWardsSchema = z.object({
    params: z.object({
        districtID: z.coerce
                    .number()
                    .int()
                    .positive()
    }).strict()
});

export const getFeeSchema = z.object({
    body: z.object({
        fromDistrictId: z.coerce
            .number()
            .int()
            .positive(),

        fromWardCode: z
            .string()
            .trim()
            .min(1),

        toDistrictId: z.coerce
            .number()
            .int()
            .positive(),

        toWardCode: z
            .string()
            .trim()
            .min(1),

        weight: z.coerce
            .number()
            .int()
            .positive(),
            
        height: z.coerce
            .number()
            .int()
            .positive(),

        width: z.coerce
            .number()
            .int()
            .positive(),

        length: z.coerce
            .number()
            .int()
            .positive(),

        insuranceValue: z.coerce
            .number()
            .int()
            .nonnegative()
        
    }).strict()
});

export type GetFeeBody = z.infer<typeof getFeeSchema>["body"];