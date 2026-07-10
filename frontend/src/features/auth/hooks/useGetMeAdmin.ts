import { useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { User } from "../types/auth.types";
import { adminAuthService } from "../services/adminAuth.service";

export const useGetMeAdmin = () => {
    const [me, setMe] = useState<User>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const fetchMe = async () => {
        try {
            
            setLoading(true);
            setError("");

            const result = await adminAuthService.getMe();
            
            setMe(result.data.user);
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchMe();
    }, []);
    return {me, loading, error, refetch: fetchMe};
};