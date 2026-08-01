import Chat from "../../models/chat.model";
import RoomChat from "../../models/roomChat.model";

export const getRoomsService = async () => {
    const rooms = await RoomChat.aggregate([
        {
            $match: {
                "users.role": "user",
            }
        },
        {
            $addFields: {
                user: {
                    $first: {
                        $filter: {
                            input: "$users",
                            as: "user",
                            cond: {
                                $eq: ["$$user.role", "user"],
                            },
                        },
                    },
                },
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "user.userID",
                foreignField: "_id",
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            avatar: 1,
                        },
                    },
                ],
                as: "userInfo",
            },
        },
        {
            $unwind: "$userInfo",
        },
        {
            $project: {
                unreadCount: 1,
                lastMessage: 1,
                user: 1,
                userInfo: 1,
            },
        },
    ]);

    return {
        data: rooms,
    };
};

export const getMessagesService = async (roomID: string) => {
    const messages = await Chat.find({
        roomChatID: roomID,
    }).select("-deletedAt -updatedAt").populate("userID", "fullName avatar accountType").sort({ createdAt: 1 });
    
    return {
        data: messages,
    };
};