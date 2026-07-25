import mongoose from "mongoose";
import { z } from "zod";

const objectIdSchema = z
    .string()
    .refine(
        (value) => mongoose.Types.ObjectId.isValid(value),
        "Invalid ObjectId"
    );

export const createOrderSchema = z.object({
    body: z.object({
        fullName: z
            .string()
            .trim()
            .min(1, "Họ tên không được để trống")
            .max(100),
        phone: z
            .string()
            .trim()
            .regex(/^(0|\+84)[0-9]{9,10}$/, "Số điện thoại không hợp lệ"),
        address: z
            .string()
            .trim()
            .min(1, "Địa chỉ không được để trống")
            .max(255),
        province: z
            .string()
            .trim()
            .min(1, "Vui lòng chọn tỉnh/thành"),
        district: z
            .string()
            .trim()
            .min(1, "Vui lòng chọn quận/huyện"),
        ward: z
            .string()
            .trim()
            .min(1, "Vui lòng chọn phường/xã"),
        districtID: z
            .number()
            .int()
            .positive(),
        wardCode: z
            .string()
            .trim()
            .min(1, "Vui lòng chọn phường/xã"),
        note: z
            .string()
            .trim()
            .max(500)
            .optional(),
        paymentMethod: z.enum(["COD", "VNPAY"]),
        products: z.array(
                z.object({
                    productID: objectIdSchema,
                    quantity: z
                        .number()
                        .int()
                        .positive("Số lượng phải lớn hơn 0")
                })
            ).min(1, "Đơn hàng phải có ít nhất 1 sản phẩm")
    })
});

export type CreateOrderBody = z.infer<typeof createOrderSchema>["body"];