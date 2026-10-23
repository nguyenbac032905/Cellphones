import { Types } from "mongoose";
import Review from "../../models/review.model";
import Product from "../../models/product.model";
import { AppError } from "../../utils/AppError";
import { CreateReviewBody, GetReviewsQuery, UpdateReviewBody } from "../../validations/client/review.validation";

const round1 = (value: number) => Math.round(value * 10) / 10;

interface PopulatedUser {
    _id: Types.ObjectId;
    fullName?: string | null;
    avatar?: string | null;
}

// Điểm trung bình của nhiều sản phẩm (dùng cho ProductItem - gọi 1 lần cho cả danh sách)
export const getProductsRatingService = async (productIDs: string[]) => {
    const rows = await Review.aggregate([
        { $match: { productID: { $in: productIDs.map(id => new Types.ObjectId(id)) } } },
        {
            $group: {
                _id: "$productID",
                average: { $avg: "$rating" },
                total: { $sum: 1 }
            }
        }
    ]);

    // sản phẩm chưa có đánh giá thì trả 0
    const data: Record<string, { average: number; total: number }> = {};
    productIDs.forEach(id => {
        data[id] = { average: 0, total: 0 };
    });
    rows.forEach(row => {
        data[row._id.toString()] = {
            average: round1(row.average),
            total: row.total
        };
    });

    return { data };
};

// Điểm trung bình + phân bố số sao của 1 sản phẩm
export const getReviewSummaryService = async (productID: string) => {
    const rows = await Review.aggregate([
        { $match: { productID: new Types.ObjectId(productID) } },
        {
            // 4.5 sao được tính vào nhóm "4 sao"
            $group: {
                _id: { $floor: "$rating" },
                count: { $sum: 1 },
                sum: { $sum: "$rating" }
            }
        }
    ]);

    const distribution: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let total = 0;
    let sum = 0;

    rows.forEach(row => {
        const star = Math.min(Math.max(row._id, 1), 5) as 1 | 2 | 3 | 4 | 5;
        distribution[star] += row.count;
        total += row.count;
        sum += row.sum;
    });

    return {
        data: {
            average: total > 0 ? round1(sum / total) : 0,
            total,
            distribution
        }
    };
};

export const getReviewsService = async (productID: string, query: GetReviewsQuery) => {
    const { star, page, limit } = query;

    const filter: Record<string, unknown> = {
        productID: new Types.ObjectId(productID)
    };

    if (star) {
        const starNum = Number(star);
        filter.rating = { $gte: starNum, $lt: starNum + 1 };
    }

    const [reviews, total] = await Promise.all([
        Review.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate<{ userID: PopulatedUser | null }>("userID", "fullName avatar")
            .lean(),
        Review.countDocuments(filter)
    ]);

    const data = reviews.map(review => ({
        _id: review._id,
        rating: review.rating,
        content: review.content,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
        user: {
            _id: review.userID?._id ?? null,
            fullName: review.userID?.fullName || "Người dùng",
            avatar: review.userID?.avatar ?? null
        }
    }));

    return {
        data,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};

// Review của chính user đang đăng nhập (để hiển thị form sửa)
export const getMyReviewService = async (userID: string, productID: string) => {
    const review = await Review.findOne({ userID, productID })
        .select("_id rating content")
        .lean();

    return { data: review ?? null };
};

export const createReviewService = async (userID: string, body: CreateReviewBody) => {
    const product = await Product.exists({
        _id: body.productID,
        deleted: false,
        status: "active"
    });

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    try {
        const review = await Review.create({
            productID: body.productID,
            userID,
            rating: body.rating,
            content: body.content
        });

        return {
            message: "Create review successfully",
            data: { _id: review._id }
        };
    } catch (error: any) {
        // vi phạm unique index (productID + userID)
        if (error?.code === 11000) {
            throw new AppError("You have already reviewed this product", 409);
        }
        throw error;
    }
};

export const updateReviewService = async (userID: string, reviewID: string, body: UpdateReviewBody) => {
    const review = await Review.findOneAndUpdate(
        { _id: reviewID, userID },
        { $set: { rating: body.rating, content: body.content } },
        { new: true, runValidators: true }
    ).select("_id productID");

    if (!review) {
        throw new AppError("Review not found", 404);
    }

    return {
        message: "Update review successfully",
        data: { _id: review._id, productID: review.productID }
    };
};

export const deleteReviewService = async (userID: string, reviewID: string) => {
    const result = await Review.deleteOne({ _id: reviewID, userID });

    if (result.deletedCount === 0) {
        throw new AppError("Review not found", 404);
    }

    return {
        message: "Delete review successfully"
    };
};
