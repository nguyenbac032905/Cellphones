import { useState } from "react";
import { adminAuthService } from "../services/adminAuth.service";
import type { RegisterBody } from "../validations/auth.validation";

export const useRegister = () => {
    const [loading, setLoading] = useState(false);

    const register = async (body: RegisterBody) => {
        try {
            setLoading(true);

            const res = await adminAuthService.register(body);

            return res;
        } finally {
            setLoading(false);
        }
    };

    return { loading, register };
};