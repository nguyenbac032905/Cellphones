import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { Coupon } from "../types/coupon.type";
import { couponAdminService } from "../services/couponAdmin.service";

export const useCouponsAdmin = () => {
    const [coupons, setCounpons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchApi = useCallback(async () => {
        try {
            setError("");
            const result = await couponAdminService.getAll();
            setCounpons(result.data);
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    },[])
    useEffect(() => {
        fetchApi();
    }, [fetchApi]);
    return {coupons, loading, error, refetch: fetchApi};
};