import axios from "axios";
import { BRANCH_HEADER, getStoredBranchId } from "../../features/branches/utils/branchStorage";
const backendLocal = import.meta.env.VITE_BACKEND_LOCAL;
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const publicClient = axios.create(({
    baseURL: import.meta.env.DEV ? backendLocal : backendUrl,
    timeout: 10000,
    withCredentials:true
}));
publicClient.interceptors.request.use((config) => {
    // Mọi request đều gửi chi nhánh người dùng đang chọn (mặc định Hà Nội)
    config.headers[BRANCH_HEADER] = getStoredBranchId();
    return config;
})
publicClient.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err)
)