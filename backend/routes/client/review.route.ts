import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/review.controller";
import { authMiddleware } from "../../middlewares/client/auth.middleware";
import { validateMiddlware } from "../../middlewares/shared/validate.middleware";
import {
    createReviewSchema,
    deleteReviewSchema,
    getProductReviewParamsSchema,
    getRatingsSchema,
    getReviewsSchema,
    updateReviewSchema
} from "../../validations/client/review.validation";

// public
router.post("/ratings", validateMiddlware(getRatingsSchema), controller.getProductsRating);
router.get("/product/:productID/summary", validateMiddlware(getProductReviewParamsSchema), controller.getReviewSummary);
router.get("/product/:productID/me", authMiddleware, validateMiddlware(getProductReviewParamsSchema), controller.getMyReview);
router.get("/product/:productID", validateMiddlware(getReviewsSchema), controller.getReviews);

// cần đăng nhập
router.post("/", authMiddleware, validateMiddlware(createReviewSchema), controller.createReview);
router.patch("/:reviewID", authMiddleware, validateMiddlware(updateReviewSchema), controller.updateReview);
router.delete("/:reviewID", authMiddleware, validateMiddlware(deleteReviewSchema), controller.deleteReview);

export default router;
