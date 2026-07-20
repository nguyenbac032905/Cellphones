import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            index: true,
            unique: true
        },

        otp: {
            type: String,
            required: true,
        },

        purpose: {
            type: String,
            enum: [
                "register",
                "forgot-password",
                "change-email",
            ],
            required: true,
        },

        expireAt: {
            type: Date,
            required: true,
            expires: 0,
        },

        attempts: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

otpSchema.index(
    {
        email: 1,
        purpose: 1,
    }
);

const Otp = mongoose.model("Otp", otpSchema, "otps");
export default Otp;