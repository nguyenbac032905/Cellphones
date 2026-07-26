import { useEffect, useState } from "react"
import type { Province } from "../types/checkout.type"
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { checkoutService } from "../services/checkout.service";

export const useProvinces = () => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);

                const result = await checkoutService.getProvinces();
                setProvinces(result.data);
            } catch (error) {
                setError(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };

        fetchApi();
    }, []);

    return { provinces, loading, error };
};