import jwt from "jsonwebtoken";
import { Socket } from "socket.io";

export const authSocketMiddleware = ( socket: Socket, next: (err?: Error) => void ) => {
    try {
        const token = socket.handshake.auth.token;
        if(!token) {
            return next(new Error("Unauthorized"));
        }
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
        socket.data.user = payload;
        next();
    } catch (error) {
        next(new Error("Unauthorized"));
    }
};