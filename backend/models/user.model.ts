import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            default: null
        },

        phone: {
            type: String,
            default: null
        },

        avatar: {
            type: String,
            default: null
        },

        accountType: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },

        roleID: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Role", 
            default: null
        },

        refreshToken: {
            type: String,
            default: null
        },

        refreshTokenExpiredAt: {
            type: Date,
            default: null
        },

        status: {
            type: String,
            enum: ["active", "inactive", "pending"],
            default: "active"
        },

        deleted: {
            type: Boolean,
            default: false
        },

        deletedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

userSchema.index({ role: 1 });
userSchema.index({ accountType: 1 });

userSchema.methods.hasPermission = function (
    permission: string
) {
    return this.permissions.includes(permission);
};

const User = mongoose.model(
    "User",
    userSchema,
    "users"
);

export default User;