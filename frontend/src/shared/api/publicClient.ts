import axios from "axios";
export const publicClient = axios.create(({
    baseURL: "https://cellphones-9jtb.onrender.com",
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