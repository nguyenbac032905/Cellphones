import { publicClient } from "../../../shared/api/publicClient";
import { privateClient } from "../../../shared/api/privateClient";
import type { MessageResponse } from "../../../shared/types/common.type";
import type {
    CreateReviewBody,
    MyReviewResponse,
    RatingsResponse,
    ReviewBody,
    ReviewMutationResponse,
    ReviewsQuery,
    ReviewsResponse,
    ReviewSummaryResponse
} from "../types/review.type";

export const reviewService = {
    // điểm trung bình của nhiều sản phẩm (tối đa 50 id / lần)
    getRatings: async (productIDs: string[]): Promise<RatingsResponse> => {
        const res = await publicClient.post<RatingsResponse>("/api/reviews/ratings", { productIDs });
        return res.data;
    },
    getSummary: async (productID: string): Promise<ReviewSummaryResponse> => {
        const res = await publicClient.get<ReviewSummaryResponse>(`/api/reviews/product/${productID}/summary`);
        return res.data;
    },
    getReviews: async (productID: string, query: ReviewsQuery): Promise<ReviewsResponse> => {
        const res = await publicClient.get<ReviewsResponse>(`/api/reviews/product/${productID}`, { params: query });
        return res.data;
    },
    getMyReview: async (productID: string): Promise<MyReviewResponse> => {
        const res = await privateClient.get<MyReviewResponse>(`/api/reviews/product/${productID}/me`);
        return res.data;
    },
    create: async (body: CreateReviewBody): Promise<ReviewMutationResponse> => {
        const res = await privateClient.post<ReviewMutationResponse>("/api/reviews", body);
        return res.data;
    },
    update: async (reviewID: string, body: ReviewBody): Promise<ReviewMutationResponse> => {
        const res = await privateClient.patch<ReviewMutationResponse>(`/api/reviews/${reviewID}`, body);
        return res.data;
    },
    remove: async (reviewID: string): Promise<MessageResponse> => {
        const res = await privateClient.delete<MessageResponse>(`/api/reviews/${reviewID}`);
        return res.data;
    }
};
