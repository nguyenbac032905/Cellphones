import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
        },

        discountType: {
            type: String,
            enum: ["percent", "fixed"],
            required: true,
        },

        discountValue: {
            type: Number,
            required: true,
        },

        maxDiscount: {
            type: Number,
            default: null,
        },

        minOrderValue: {
            type: Number,
            default: 0,
        },

        expireAt: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },

        deleted: {
            type: Boolean,
            default: false,
        },
    }
);

const Coupon = mongoose.model("Coupon", couponSchema, "coupons");

export default Coupon;