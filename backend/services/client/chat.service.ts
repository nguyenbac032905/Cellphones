import Chat from "../../models/chat.model";
import RoomChat from "../../models/roomChat.model"
import { AppError } from "../../utils/AppError";

export const getRoomChatService = async (userID: string) => {
    const myRoomChat = await RoomChat.findOne({"users.userID": userID}).select("_id").lean();
    if(!myRoomChat){
        throw new AppError("Room chat not found", 404);
    }
    return {
        data: myRoomChat
    }
}
export const getMessagesService = async (roomID: string, userID: string) => {
    const joinedRoom = await RoomChat.findOne({
        _id: roomID,
        "users.userID": userID,
    }).select("_id");

    if (!joinedRoom) {
        throw new AppError("Bạn chưa tham gia room này", 403);
    }

    const messages = await Chat.find({
        roomChatID: roomID,
    }).select("-deletedAt -updatedAt").populate("userID", "fullName avatar accountType").sort({ createdAt: 1 });

    return {
        data: messages,
    };
};