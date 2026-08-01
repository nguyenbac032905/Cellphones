import { getMessagesService, getRoomChatService } from "../../services/client/chat.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { Request, Response } from "express";

export const getRoomChat = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user!;
    const result = await getRoomChatService(user._id.toString());
    return res.status(200).json({
        success: true,
        data: result.data
    })
})
export const getMessages = asyncHandler(async (req: Request<{roomID: string}>, res: Response) => {
    const user = req.user!;
    const roomID = req.params.roomID!;
    const result = await getMessagesService(roomID, user._id.toString());
    return res.status(200).json({
        success: true,
        data: result.data
    })
})