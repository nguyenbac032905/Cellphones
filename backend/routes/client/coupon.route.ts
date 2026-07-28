import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/coupon.controller";

router.get("/", controller.getCoupons);

export default router;