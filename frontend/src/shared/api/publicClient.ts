import axios from "axios";
const backendLocal = import.meta.env.VITE_BACKEND_LOCAL;
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const publicClient = axios.create(({
    baseURL: import.meta.env.DEV ? backendLocal : backendUrl,
    timeout: 10000,
    withCredentials:true
}));
publicClient.interceptors.request.use((config) => {
    return config;
})
publicClient.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err)
)