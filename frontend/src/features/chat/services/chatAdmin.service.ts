import { privateAdmin } from "../../../shared/api/privateAdmin";
import type { GetMessagesResponse, RoomsAdminResponse } from "../types/chatAdmin.type";

export const chatAdminService = {
    getRooms: async (): Promise<RoomsAdminResponse> => {
        const result = await privateAdmin.get<RoomsAdminResponse>("/admin/api/chats/rooms");
        return result.data
    },
    getMessages: async (roomID: string): Promise<GetMessagesResponse> => {
        const result = await privateAdmin.get<GetMessagesResponse>(`/admin/api/chats/${roomID}`);
        return result.data
    }
}