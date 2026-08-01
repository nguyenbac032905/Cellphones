import { getMessagesService, getRoomsService } from "../../services/admin/chat.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { Request, Response } from "express";

export const getRooms = asyncHandler(async (req: Request, res: Response) => {
    const result = await getRoomsService();
    return res.status(200).json({
        success: true,
        data: result.data
    })
})
export const getMessages = asyncHandler(async (req: Request<{roomID: string}>, res: Response) => {
    const roomID = req.params.roomID!;
    const result = await getMessagesService(roomID);
    return res.status(200).json({
        success: true,
        data: result.data
    })
})