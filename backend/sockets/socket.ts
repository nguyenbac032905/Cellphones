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
                const accountType = user.accountType;
                if(accountType === "user"){
                    const room = await RoomChat.findOne({ _id: roomID, "users.userID": user._id, }).select("_id").lean();
                    if (!room) {
                        return callback({success: false, message: "Không có quyền vào phòng"});
                    }
                }
                const update = {
                    $set: {
                        [`unreadCount.${user.accountType}`]: 0,
                    }
                };
                await RoomChat.updateOne({ _id: roomID }, update);
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
            
            const createdChat = await Chat.create({ userID: user._id, roomChatID: roomID, content: message, });

            const update = user.accountType === "user" ? 
                {
                    $inc: {
                        "unreadCount.admin": 1,
                    },
                    $set: {
                        lastMessage: {
                            role: "user",
                            message,
                            createdAt: new Date(),
                        },
                    },
                }: 
                {
                    $inc: {
                        "unreadCount.user": 1,
                    },
                    $set: {
                        lastMessage: {
                            role: "admin",
                            message,
                            createdAt: new Date(),
                        },
                    },
                };
            await RoomChat.updateOne({ _id: roomID }, update);

            const chat = await Chat.findById(createdChat._id).select("-deletedAt -updatedAt").populate("userID", "fullName avatar accountType").lean();
            io.to(roomID).emit("receive_message", chat);
        });
        socket.on("disconnect", () => {
            console.log(`${socket.id} disconnected`);
        });
    });
};