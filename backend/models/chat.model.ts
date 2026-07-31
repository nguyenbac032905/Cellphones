import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        roomChatID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RoomChat",
            required: true,
            index: true,
        },

        content: {
            type: String,
            trim: true,
            default: "",
        },

        images: {
            type: [String],
            default: [],
        },

        deleted: {
            type: Boolean,
            default: false,
            index: true,
        },

        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

chatSchema.index({ roomChatID: 1, createdAt: 1 });

const Chat = mongoose.model("Chat", chatSchema, "chats");

export default Chat;