import { z } from "zod";

export const createOrderSchema = z.object({
    products: z .array(
        z.object({
            productID: z
                .string()
                .regex(/^[a-fA-F0-9]{24}$/, "ID sản phẩm không hợp lệ"),
            quantity: z
                .number({
                    error: "Số lượng phải là số",
                })
                .int("Số lượng phải là số nguyên")
                .positive("Số lượng phải lớn hơn 0"),
        })
    ).min(1, "Vui lòng chọn ít nhất một sản phẩm"),

    fullName: z
        .string()
        .trim()
        .min(1, "Vui lòng nhập họ và tên")
        .max(100, "Họ và tên không được vượt quá 100 ký tự"),

    phone: z
        .string()
        .trim()
        .regex(/^(0|\+84)(3|5|7|8|9)\d{8}$/, "Số điện thoại không hợp lệ"),

    address: z
        .string()
        .trim()
        .min(1, "Vui lòng nhập địa chỉ")
        .max(255, "Địa chỉ không được vượt quá 255 ký tự"),

    province: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),

    district: z.string().min(1, "Vui lòng chọn quận/huyện"),

    ward: z.string().min(1, "Vui lòng chọn phường/xã"),

    districtID: z
        .number({
            error: "Quận/Huyện không hợp lệ",
        })
        .int()
        .positive(),

    wardCode: z.string().min(1, "Phường/Xã không hợp lệ"),

    note: z
        .string()
        .trim()
        .max(500, "Ghi chú không được vượt quá 500 ký tự")
        .optional(),

    paymentMethod: z.enum(["COD", "VNPAY"], {
        error: "Phương thức thanh toán không hợp lệ",
    }),
    couponID: z
        .string()
        .regex(/^[a-fA-F0-9]{24}$/, "ID sản phẩm không hợp lệ")
        .optional()
});

export type CreateOrderBody = z.infer<typeof createOrderSchema>;