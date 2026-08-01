import type { ApiResponse } from "../../../shared/types/common.type";

export type RoomAdmin = {
    _id: string;

    users: {
        _id: string;
        userID: string;
        role: "user";
        joinedAt: string;
    }[];

    userInfo: {
        _id: string;
        fullName: string;
        avatar: string;
    };

    unreadCount: {
        admin: number;
        user: number;
    };

    lastMessage: {
        role: "admin" | "user";
        message: string;
        createdAt: string;
    } | null;
};
export type RoomsAdminResponse = ApiResponse<RoomAdmin[]>;

export interface IChatUser {
    _id: string;
    fullName: string;
    avatar: string | null;
    accountType: "admin" | "user";
}

export interface IChatMessage {
    _id: string;
    userID: IChatUser;
    roomChatID: string;
    content: string;
    images: string[];
    deleted: boolean;
    createdAt: string;
}

export type GetMessagesResponse = ApiResponse<IChatMessage[]>;