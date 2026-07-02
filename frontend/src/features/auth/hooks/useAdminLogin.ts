import { useState } from "react";
import { adminAuthService } from "../services/adminAuth.service";

export const useAdminLogin = () => {
    const [loading, setLoading] = useState(false);

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);

            const res = await adminAuthService.login(email,password);

            return res;
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};