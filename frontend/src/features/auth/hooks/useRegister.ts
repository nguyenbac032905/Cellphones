import { useState } from "react";
import type { RegisterBody } from "../validations/auth.validation";
import { authService } from "../services/auth.service";

export const useRegister = () => {
    const [loading, setLoading] = useState(false);

    const register = async (body: RegisterBody) => {
        try {
            setLoading(true);

            const res = await authService.register(body);

            return res;
        } finally {
            setLoading(false);
        }
    };

    return { loading, register };
};