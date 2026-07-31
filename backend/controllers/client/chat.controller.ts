import { getRoomChatService } from "../../services/client/chat.service";
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