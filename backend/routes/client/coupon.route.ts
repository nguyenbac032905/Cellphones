import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/coupon.controller";
import { authMiddleware } from "../../middlewares/client/auth.middleware";
import { validateMiddlware } from "../../middlewares/shared/validate.middleware";
import { addCouponSchema } from "../../validations/client/coupon.validation";

router.get("/", controller.getCoupons);
router.post("/",authMiddleware,validateMiddlware(addCouponSchema), controller.addCoupon);

export default router;