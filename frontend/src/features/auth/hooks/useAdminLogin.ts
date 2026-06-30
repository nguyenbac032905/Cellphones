import { useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { adminAuthService } from "../services/adminAuth.service";

export const useAdminLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError("");

            const res = await adminAuthService.login(email,password);

            return res;
        } catch (error) {
            const message = getErrorMessage(error);
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, login };
};