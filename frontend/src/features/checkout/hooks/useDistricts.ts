import { useState } from "react";
import type { District } from "../types/checkout.type";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { checkoutService } from "../services/checkout.service";

export const useDistricts = () => {
    const [districts, setDistricts] = useState<District[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getDistricts = async (provinceID: number) => {
        if (!provinceID) {
            setDistricts([]);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const result = await checkoutService.getDistricts(provinceID);
            setDistricts(result.data);
        } catch (error) {
            setError(getErrorMessage(error));
            setDistricts([]);
        } finally {
            setLoading(false);
        }
    };

    return { districts, loading, error, getDistricts, };
};