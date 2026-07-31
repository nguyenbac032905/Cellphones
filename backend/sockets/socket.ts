import { Server } from "socket.io";
import { authSocketMiddleware } from "./middlewares/auth.middleware";
import RoomChat from "../models/roomChat.model";
import Chat from "../models/chat.model";

export const initSocket = (io: Server) => {
    io.use(authSocketMiddleware);
    io.on("connection", (socket) => {
        socket.on("join_room", async (roomID: string, callback) => {
            try {
                const user = socket.data.user;
                const room = await RoomChat.findOne({ _id: roomID, "users.userID": user._id, }).select("_id").lean();

                if (!room) {
                    return callback({success: false, message: "Không có quyền vào phòng"});
                }

                socket.join(roomID);
                socket.data.roomID = roomID;
                
                callback({
                    success: true,
                });
            } catch (error) {
                callback({
                    success: false,
                    message: "Lỗi server",
                });
            }
        });

        socket.on("send_message", async (message: string) => {
            const user = socket.data.user;
            const roomID = socket.data.roomID;

            if (!roomID) return;

            const chat = await Chat.create({
                userID: user._id,
                roomChatID: roomID,
                content: message,
            });

            io.to(roomID).emit("receive_message", {
                _id: chat._id,
                accountType: user.accountType,
                fullName: user.fullName,
                message: chat.content,
            });
        });

        socket.on("disconnect", () => {
            console.log(`${socket.id} disconnected`);
        });
    });
};