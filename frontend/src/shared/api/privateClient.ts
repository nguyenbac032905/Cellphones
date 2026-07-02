
import { store } from "../../app/store";
import { clearAuth, setAuth } from "../../features/auth/auth.slice";
import { publicClient } from "./publicClient";
import axios from "axios";

export const privateClient = axios.create(({
    baseURL: "http://localhost:3000",
    timeout: 10000,
    withCredentials: true
}));

privateClient.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
})
//khai báo biến đang refresh token và danh sách hàng đợi để request
let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];
privateClient.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;
        if(error.response?.status === 401 && !originalRequest._retry){
            // sử dụng retry để tránh việc 1 request A bị gọi quá nhiều lần do useEffect,..
            originalRequest._retry = true;
            // CASE 1: nếu như A đang refresh thì BCD sẽ được đẩy vào hàng đợi và đợi token mà backend trả về
            if (isRefreshing) {
                return new Promise((resolve) => {
                    refreshQueue.push((token: string) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(privateClient(originalRequest));
                    });
                });
            }
            isRefreshing = true;
            try {
                const result = await publicClient.get("/admin/api/auth/refresh-token");
                const newAccessToken = result.data.accessToken;
                const state = store.getState().auth;
                if (!state.user) {
                    throw new Error("Frontend no user found");
                }     
                store.dispatch(setAuth({
                    accessToken: newAccessToken,
                    user: state.user
                }))
                // lặp qua từng phần tử của hàng đợi và gửi newAccessToken cho nó để nó request
                refreshQueue.forEach((cb) => cb(newAccessToken));
                refreshQueue = [];
                // request cho chính reqquest A
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return privateClient( originalRequest );
            } catch (refreshError) {
                store.dispatch(clearAuth());
                window.location.href = "/admin/login";
                return Promise.reject( refreshError );
            }
        }
        return Promise.reject(error);
    }
)