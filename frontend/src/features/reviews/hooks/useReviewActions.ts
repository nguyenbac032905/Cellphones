import { useState } from "react";
import { reviewService } from "../services/review.service";
import type { CreateReviewBody, ReviewBody } from "../types/review.type";
import { emitReviewChange } from "../utils/ratingStore";

export const useCreateReview = () => {
    const [loading, setLoading] = useState(false);

    const createReview = async (body: CreateReviewBody) => {
        try {
            setLoading(true);
            const result = await reviewService.create(body);
            emitReviewChange(body.productID);
            return result;
        } finally {
            setLoading(false);
        }
    };

    return { loading, createReview };
};

export const useUpdateReview = () => {
    const [loading, setLoading] = useState(false);

    const updateReview = async (reviewID: string, productID: string, body: ReviewBody) => {
        try {
            setLoading(true);
            const result = await reviewService.update(reviewID, body);
            emitReviewChange(productID);
            return result;
        } finally {
            setLoading(false);
        }
    };

    return { loading, updateReview };
};

export const useDeleteReview = () => {
    const [loading, setLoading] = useState(false);

    const deleteReview = async (reviewID: string, productID: string) => {
        try {
            setLoading(true);
            const result = await reviewService.remove(reviewID);
            emitReviewChange(productID);
            return result;
        } finally {
            setLoading(false);
        }
    };

    return { loading, deleteReview };
};
