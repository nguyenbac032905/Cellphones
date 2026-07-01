import { clearAuth, setAuth } from "../../features/auth/auth.slice";
import { publicClient } from "../../shared/api/publicClient";
import { store } from "../store";

export const bootstrapAuth = async () => {
    try{
        const refreshRes = await publicClient.get("/admin/api/auth/refresh-token");
        const accessToken = refreshRes.data.accessToken;

        const profileRes = await publicClient.get("/admin/api/auth/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        store.dispatch(setAuth({
            accessToken,
            user: profileRes.data,
            message: "User authenticated successfully"
        }))

    }catch(error){
        store.dispatch(clearAuth());
    }
}