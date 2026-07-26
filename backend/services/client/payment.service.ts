import { createVNPayUrl } from "../../helpers/vnpay";

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