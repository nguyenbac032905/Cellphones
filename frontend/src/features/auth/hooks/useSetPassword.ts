import { useState } from "react";
import { adminAuthService } from "../services/adminAuth.service";
import type { SetPasswordBody } from "../validations/auth.validation";

export const useSetPassword = () => {
    const [loading, setLoading] = useState(false);

    const setPassword = async (body: SetPasswordBody) => {
        try {
            setLoading(true);

            const res = await adminAuthService.setPassword(body);

            return res;
        } finally {
            setLoading(false);
        }
    };

    return { loading, setPassword };
};