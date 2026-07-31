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