import { getErrorMessage } from "../utils/errorHandler";
import axiosBase from "./axiosBase";
export const publicClient = axiosBase;
publicClient.interceptors.request.use((config) => {
    return config;
})
publicClient.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(getErrorMessage(err))
)