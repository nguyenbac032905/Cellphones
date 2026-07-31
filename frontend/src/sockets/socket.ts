import { io } from "socket.io-client";
import { store } from "../app/store";

const backendLocal = import.meta.env.VITE_BACKEND_LOCAL;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const socket = io( import.meta.env.DEV ? backendLocal : backendUrl, {
    autoConnect: false,
});
// tạo hàm kết nối sẽ gửi lên cả accessToken
export const connectSocket = () => {
    socket.auth = {
        token: store.getState().auth.accessToken,
    };

    socket.connect();
};
// tạo hàm ngắt kết nối socketIO
export const disconnectSocket = () => {
    socket.disconnect();
};