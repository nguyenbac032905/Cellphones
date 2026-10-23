import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        // 1 -> 5, bước nhảy 0.5
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
            validate: {
                validator: (value: number) => Number.isInteger(value * 2),
                message: "Rating must be in steps of 0.5"
            }
        },
        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000
        }
    },
    {
        timestamps: true
    }
);

// mỗi user chỉ đánh giá 1 lần cho 1 sản phẩm (có thể sửa lại)
reviewSchema.index({ productID: 1, userID: 1 }, { unique: true });
// phục vụ list review mới nhất theo sản phẩm
reviewSchema.index({ productID: 1, createdAt: -1 });
// phục vụ lọc theo sao
reviewSchema.index({ productID: 1, rating: 1 });

const Review = mongoose.model("Review", reviewSchema, "reviews");

export default Review;
