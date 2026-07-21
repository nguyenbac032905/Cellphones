import { useState } from "react";
import type { LoginBody } from "../validations/auth.validation";
import { authService } from "../services/auth.service";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);

    const login = async (body: LoginBody) => {
        try {
            setLoading(true);

            const res = await authService.login(body);

            return res;
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};