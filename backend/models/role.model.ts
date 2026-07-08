import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true,
        unique: true
    },

    description: String,

    permissions: {
        type: [String],
        default: []
    },

    deleted: {
        type: Boolean,
        default: false
    },

    deletedAt: Date
},
{
    timestamps: true
});

const Role = mongoose.model("Role", roleSchema, "roles");

export default Role;