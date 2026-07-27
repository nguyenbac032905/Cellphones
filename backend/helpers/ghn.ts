import { AppError } from "../utils/AppError";
import { ghnClient } from "../config/axiosConfig";

interface GHNItem {
    title: string;
    quantity: number;
    price: number;
}
interface CreateGHNOrderParams {
    fullName: string;
    phone: string;
    address: string;
    districtID: number;
    wardCode: string;
    note?: string;
    codAmount: number;
    paymentTypeID: 1 | 2;

    items: GHNItem[];
}
interface ShippingDetails {
    shippingOrderCode: string;
    expectedDeliveryDate: Date;
    ghnStatus:
        | "ready_to_pick"
        | "picking"
        | "cancel"
        | "picked"
        | "storing"
        | "transporting"
        | "sorting"
        | "delivering"
        | "delivery_fail"
        | "delivered"
        | "waiting_to_return"
        | "return"
        | "returned";
}

export const createGHNOrder = async ({ 
    fullName, phone, address, districtID, wardCode, note, codAmount, paymentTypeID, items 
}: CreateGHNOrderParams): Promise<ShippingDetails> => {
    const res = await ghnClient.post("/v2/shipping-order/create", {
        // type = 1 là shop trả, type = 2 là người dùng trả
        payment_type_id: paymentTypeID,
        cod_amount: codAmount,
        note,
        required_note: "KHONGCHOXEMHANG",

        from_name: "Cellphones",
        from_phone: "0353263314",
        from_address: "25 Ngô Tất Tố, phường An Tảo, thành phố Hưng Yên, tỉnh Hưng Yên",
        from_district_id: 1680,
        from_ward_code: "220101",

        to_name: fullName,
        to_phone: phone,
        to_address: address,
        to_district_id: districtID,
        to_ward_code: wardCode,

        weight: 3000,
        length: 40,
        width: 30,
        height: 10,
        service_type_id: 2,

        items: items.map((item) => ({
            name: item.title,
            quantity: item.quantity,
            price: item.price
        }))
    });

    if (!res.data?.data) {
        throw new AppError("Tạo đơn hàng GHN thất bại!");
    }

    return {
        shippingOrderCode: res.data.data.order_code,
        expectedDeliveryDate: res.data.data.expected_delivery_time,
        ghnStatus: "ready_to_pick"
    };
};