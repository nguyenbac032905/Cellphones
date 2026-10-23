import type { ApiResponse, MessageResponse, PaginationMeta } from "../../../shared/types/common.type";

export type StarFilter = "1" | "2" | "3" | "4" | "5";

export interface RatingInfo {
    average: number;
    total: number;
}

export interface ReviewSummary extends RatingInfo {
    distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

export interface ReviewItem {
    _id: string;
    rating: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: {
        _id: string | null;
        fullName: string;
        avatar: string | null;
    };
}

export interface MyReview {
    _id: string;
    rating: number;
    content: string;
}

export interface ReviewBody {
    rating: number;
    content: string;
}

export interface CreateReviewBody extends ReviewBody {
    productID: string;
}

export interface ReviewsQuery {
    star?: StarFilter;
    page?: number;
    limit?: number;
}

export type RatingsResponse = ApiResponse<Record<string, RatingInfo>>;
export type ReviewSummaryResponse = ApiResponse<ReviewSummary>;
export type ReviewsResponse = ApiResponse<ReviewItem[]> & { meta: PaginationMeta };
export type MyReviewResponse = ApiResponse<MyReview | null>;
export type ReviewMutationResponse = MessageResponse & { data?: { _id: string; productID?: string } };
