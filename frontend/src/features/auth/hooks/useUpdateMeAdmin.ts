import { useState } from "react";
import type { UpdateMeBody } from "../validations/auth.validation";
import { adminAuthService } from "../services/adminAuth.service";

export const useUpdateMeAdmin = () => {
    const [loading, setLoading] = useState(false);

    const updateMe = async (body: UpdateMeBody) => {
        try {
            setLoading(true);

            const result = await adminAuthService.updateMe(body);

            return result;
        } finally {
            setLoading(false);
        }
    };

    return { loading, updateMe };
};