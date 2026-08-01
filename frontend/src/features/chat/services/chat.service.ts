import { privateClient } from "../../../shared/api/privateClient";
import type { GetRoomResponse } from "../types/chat.type";
import type { GetMessagesResponse } from "../types/chatAdmin.type";

export const chatService = {
    getRoom: async (): Promise<GetRoomResponse> => {
        const result = await privateClient.get<GetRoomResponse>("/api/chats/my-room");
        return result.data
    },
    getMessages: async (roomID: string): Promise<GetMessagesResponse> => {
        const result = await privateClient.get<GetMessagesResponse>(`/api/chats/${roomID}`);
        return result.data
    }
}