import { useState } from "react";
import type { SetPasswordBody } from "../validations/auth.validation";
import { authService } from "../services/auth.service";

export const useSetPassword = () => {
    const [loading, setLoading] = useState(false);

    const setPassword = async (body: SetPasswordBody) => {
        try {
            setLoading(true);

            const res = await authService.setPassword(body);

            return res;
        } finally {
            setLoading(false);
        }
    };

    return { loading, setPassword };
};