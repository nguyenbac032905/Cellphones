import axios from "axios";
import { store } from "../../app/store";
import { publicClient } from "./publicClient";
import { clearAuth, setAuth } from "../../features/auth/auth.slice";

export const privateClient = axios.create(({
    baseURL: "http://localhost:3000",
    timeout: 10000,
    withCredentials: true
}));

privateClient.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
});
let isRefreshing = false;
let refreshQueue : Array<(token: string) => void> = [];
privateClient.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config
        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;

            if(isRefreshing){
                return new Promise((resolve) => {
                    refreshQueue.push((token: string) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(privateClient(originalRequest));
                    })
                })
            }

            isRefreshing = true;
            try {
                const result = await publicClient.get("/api/auth/refresh-token");
                const newAccessToken = result.data.accessToken;
                const state = store.getState().auth;
                if(!state.user){
                    throw new Error("Frontend User not found");
                }
                store.dispatch(setAuth({
                    accessToken: newAccessToken,
                    user: state.user
                }))

                refreshQueue.forEach(cb => cb(newAccessToken));
                refreshQueue = [];
                
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return privateClient(originalRequest);
            } catch (refreshError) {
                store.dispatch(clearAuth());
                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false
            }
        }
        return Promise.reject(error);
    }
)