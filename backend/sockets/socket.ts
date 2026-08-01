import { Server } from "socket.io";
import { authSocketMiddleware } from "./middlewares/auth.middleware";
import RoomChat from "../models/roomChat.model";
import Chat from "../models/chat.model";
interface IChatUser {
    _id: string;
    fullName: string;
    avatar: string | null;
    accountType: "admin" | "user";
}

interface IChatMessage {
    _id: string;
    userID: IChatUser;
    roomChatID: string;
    content: string;
    images: string[];
    deleted: boolean;
    createdAt: string;
}
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
                if (user.accountType === "admin") {
                    socket.join("adminRoom");
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

        socket.on("send_message", async (data) => {
            const user = socket.data.user;
            const roomID = socket.data.roomID;
            if (!roomID) return;
            if (!data.message && (!data.images || data.images.length === 0)) {
                return;
            }
            const payload: any = {
                userID: user._id,
                roomChatID: roomID,
            };
            if (data.message) {
                payload.content = data.message.trim();
            }
            if (data.images?.length) {
                payload.images = data.images;
            }
            const createdChat = await Chat.create(payload);

            const update = user.accountType === "user" ? 
                {
                    $inc: {
                        "unreadCount.admin": 1,
                    },
                    $set: {
                        lastMessage: {
                            role: "user",
                            message: data.message,
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
                            message: data.message,
                            createdAt: new Date(),
                        },
                    },
                };
            await RoomChat.updateOne({ _id: roomID }, update);

            const chat = await Chat.findById(createdChat._id)
                        .select("-deletedAt -updatedAt")
                        .populate("userID", "fullName avatar accountType")
                        .lean<IChatMessage>();
            io.to(roomID).emit("receive_message", chat);
            io.to("adminRoom").emit("update_room", {
                roomID: roomID, 
                lastMessage: {message: chat?.content, role: chat?.userID.accountType, createdAt: chat?.createdAt}
            });
        });
        socket.on("disconnect", () => {
            console.log(`${socket.id} disconnected`);
        });
    });
};