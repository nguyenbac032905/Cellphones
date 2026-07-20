import { useState } from "react";
import { adminAuthService } from "../services/adminAuth.service";
import type { VerifyOtpBody } from "../validations/auth.validation";

export const useVerifyOtp = () => {
    const [loading, setLoading] = useState(false);

    const verifyOtp = async (body: VerifyOtpBody) => {
        try {
            setLoading(true);

            const res = await adminAuthService.verifyOtp(body);

            return res;
        } finally {
            setLoading(false);
        }
    };

    return { loading, verifyOtp };
};