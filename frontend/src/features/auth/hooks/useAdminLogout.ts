import { useState } from "react";
import { useDispatch } from "react-redux";
import { adminAuthService } from "../services/adminAuth.service";
import { clearAuth } from "../auth.slice";

export const useAdminLogout = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const logout = async () => {
        try {
            setLoading(true);

            const res = await adminAuthService.logout();

            dispatch(clearAuth());

            return res;
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout, };
};