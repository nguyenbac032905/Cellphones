import { useState } from "react";
import type { LoginBody } from "../validations/auth.validation";
import { authService } from "../services/auth.service";
import { bootstrapCart } from "../../../app/bootstrap/bootstrapCart";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);

    const login = async (body: LoginBody) => {
        try {
            setLoading(true);

            const res = await authService.login(body);

            await bootstrapCart();
            return res;
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};