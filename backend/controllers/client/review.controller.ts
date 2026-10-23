import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import {
    createReviewService,
    deleteReviewService,
    getMyReviewService,
    getProductsRatingService,
    getReviewsService,
    getReviewSummaryService,
    updateReviewService
} from "../../services/client/review.service";
import { GetReviewsQuery } from "../../validations/client/review.validation";

export const getProductsRating = asyncHandler(async (req: Request, res: Response) => {
    const { productIDs } = req.body as { productIDs: string[] };
    const result = await getProductsRatingService(productIDs);
    return res.status(200).json({
        success: true,
        data: result.data
    });
});

export const getReviewSummary = asyncHandler(async (req: Request<{ productID: string }>, res: Response) => {
    const result = await getReviewSummaryService(req.params.productID);
    return res.status(200).json({
        success: true,
        data: result.data
    });
});

export const getReviews = asyncHandler(async (req: Request<{ productID: string }>, res: Response) => {
    const result = await getReviewsService(req.params.productID, req.query as unknown as GetReviewsQuery);
    return res.status(200).json({
        success: true,
        data: result.data,
        meta: result.meta
    });
});

export const getMyReview = asyncHandler(async (req: Request<{ productID: string }>, res: Response) => {
    const user = req.user!;
    const result = await getMyReviewService(user._id.toString(), req.params.productID);
    return res.status(200).json({
        success: true,
        data: result.data
    });
});

export const createReview = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user!;
    const result = await createReviewService(user._id.toString(), req.body);
    return res.status(201).json({
        success: true,
        message: result.message,
        data: result.data
    });
});

export const updateReview = asyncHandler(async (req: Request<{ reviewID: string }>, res: Response) => {
    const user = req.user!;
    const result = await updateReviewService(user._id.toString(), req.params.reviewID, req.body);
    return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data
    });
});

export const deleteReview = asyncHandler(async (req: Request<{ reviewID: string }>, res: Response) => {
    const user = req.user!;
    const result = await deleteReviewService(user._id.toString(), req.params.reviewID);
    return res.status(200).json({
        success: true,
        message: result.message
    });
});
