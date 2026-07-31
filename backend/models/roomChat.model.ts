import mongoose from "mongoose";

const roomChatSchema = new mongoose.Schema(
    {
        users: [
            {
                userID: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                role: {
                    type: String,
                    enum: ["admin", "user"],
                    default: "user",
                },
                joinedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        unreadCount: {
            admin: {
                type: Number,
                default: 0
            },
            user: {
                type: Number,
                default: 0
            },
        },
        lastMessage: {
            userID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            message: String,
            createdAt: Date,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

roomChatSchema.index({ "users.userID": 1, });

const RoomChat = mongoose.model("RoomChat", roomChatSchema, "rooms-chat");

export default RoomChat;