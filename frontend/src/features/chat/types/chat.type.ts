import type { ApiResponse } from "../../../shared/types/common.type"

export interface Room {
    _id: string
};

export type GetRoomResponse = ApiResponse<Room>;