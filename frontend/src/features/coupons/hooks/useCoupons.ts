import { useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { Coupon } from "../types/coupon.type";
import { couponService } from "../services/coupon.service";

export const useCoupons = () => {
    const [coupons, setCounpons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApi = async () => {
            try {
                
                setLoading(true);
                setError("");

                const result = await couponService.getAll();
                
                setCounpons(result.data);
            } catch (error) {
                setError(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, []);
    return {coupons, loading, error};
};