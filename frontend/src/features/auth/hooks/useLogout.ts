import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearAuth } from "../auth.slice";
import { authService } from "../services/auth.service";

export const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const logout = async () => {
        try {
            setLoading(true);

            const res = await authService.logout();

            dispatch(clearAuth());

            return res;
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
};