import { useState } from "react";
import type { Fee, ShippingFeeBody } from "../types/checkout.type";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { checkoutService } from "../services/checkout.service";

export const useFee = () => {
    const [fee, setFee] = useState<Fee | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getFee = async (body: ShippingFeeBody) => {
        try {
            setLoading(true);
            setError("");

            const result = await checkoutService.getFee(body);
            setFee(result.data);

            return result.data;
        } catch (error) {
            setError(getErrorMessage(error));
            setFee(null);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { fee, loading, error, getFee, };
};