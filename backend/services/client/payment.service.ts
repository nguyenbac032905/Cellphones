import { createVNPayUrl, sortObject } from "../../helpers/vnpay";
import qs from "qs";
import crypto from "crypto";
import { AppError } from "../../utils/AppError";
import Order from "../../models/order.model";
import { createGHNOrder } from "../../helpers/ghn";

interface CreatePaymentUrlParams {
    paymentMethod: string;
    orderID: string;
    amount: number;
}

export const createPaymentUrlService = ({ paymentMethod, orderID, amount }: CreatePaymentUrlParams): string | null => {
    switch (paymentMethod) {
        case "VNPAY":
            return createVNPayUrl({ orderID, amount });

        case "COD":
            return null;

        default:
            return null;
    }
};

export const returnPaymentService = async (query: Record<string, any>) => {
    const secretKey = process.env.VNP_HASH_SECRET!;

    const { vnp_SecureHash, vnp_SecureHashType, ...vnpParams } = query;
    //kí dữ liệu bằng chữ kí của mình
    const sortedParams = sortObject(vnpParams);
    const signData = qs.stringify(sortedParams, { encode: false });
    const signed = crypto.createHmac("sha512", secretKey).update(Buffer.from(signData, "utf-8")) .digest("hex");
    //chuyển dữ liệu đã kí của vnpay và của mình sang buffer để so sánh bằng timingSafeEqual để chống timing attack
    const hashBuffer = Buffer.from(String(vnp_SecureHash), "utf-8");
    const signedBuffer = Buffer.from(signed, "utf-8");
    if ( hashBuffer.length !== signedBuffer.length || !crypto.timingSafeEqual(hashBuffer, signedBuffer) ) {
        throw new AppError("Sai chữ ký", 400);
    }

    const orderID = sortedParams.vnp_TxnRef as string;
    const responseCode = sortedParams.vnp_ResponseCode as string;

    const order = await Order.findById(orderID);
    if (!order) {
        throw new AppError("Không tìm thấy đơn hàng", 404);
    }

    if (order.paymentDetail?.paymentStatus === "PAID") {
        return { orderID };
    }
    //thanh toán thất bại
    if (responseCode !== "00") {
        order.paymentDetail = {
            paymentMethod: order.paymentDetail?.paymentMethod || "VNPAY",
            paymentStatus: "FAILED"
        };
        await order.save();
        return { orderID};
    }

    // thanh toán thành công
    if (!order.shippingAddress) {
        throw new AppError("Đơn hàng thiếu địa chỉ giao hàng", 400);
    }
    const { fullName, phone, address, districtID, wardCode, note } = order.shippingAddress;

    const shippingDetails = await createGHNOrder({
        fullName,
        phone,
        address,
        districtID,
        wardCode,
        note: note || undefined,
        codAmount: 0,
        paymentTypeID: 1, // 1: Bến gửi trả phí, 2: Bên nhận trả phí
        items: order.items,
    });

    order.shippingDetails = shippingDetails;
    order.paymentDetail = {
        paymentMethod: order.paymentDetail?.paymentMethod || "VNPAY",
        paymentStatus: "PAID",
        vnpayTransactionNo: sortedParams.vnp_TransactionNo as string,
        paidAt: new Date(),
    };
    await order.save();

    return {
        orderID
    };
};