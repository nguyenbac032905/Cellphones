import { useState } from "react";
import type { Ward } from "../types/checkout.type";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { checkoutService } from "../services/checkout.service";

export const useWards = () => {
    const [wards, setWards] = useState<Ward[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getWards = async (districtID: number) => {
        if (!districtID) {
            setWards([]);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const result = await checkoutService.getWards(districtID);
            setWards(result.data);
        } catch (error) {
            setError(getErrorMessage(error));
            setWards([]);
        } finally {
            setLoading(false);
        }
    };

    return { wards, loading, error, getWards, };
};