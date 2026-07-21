import { useState } from "react";
import { adminAuthService } from "../services/adminAuth.service";
import type { LoginBody } from "../validations/auth.validation";

export const useAdminLogin = () => {
    const [loading, setLoading] = useState(false);

    const login = async (body: LoginBody) => {
        try {
            setLoading(true);

            const res = await adminAuthService.login(body);

            return res;
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};