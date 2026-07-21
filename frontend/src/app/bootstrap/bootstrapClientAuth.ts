import { clearAuth, setAuth } from "../../features/auth/auth.slice";
import { publicClient } from "../../shared/api/publicClient";
import { store } from "../store";

export const bootstrapClientAuth = async () => {
    try {
        const refreshRes = await publicClient.get("/api/auth/refresh-token");
        const accessToken = refreshRes.data.data.accessToken;

        const profileRes = await publicClient.get("/api/auth/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        store.dispatch(
            setAuth({
                accessToken,
                user: profileRes.data.data.user,
            })
        );

        // Nếu API client trả về cart thì dispatch luôn
        // store.dispatch(setCart(profileRes.data.data.cart));
    } catch {
        store.dispatch(clearAuth());
    }
};