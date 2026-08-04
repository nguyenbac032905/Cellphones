import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/orders.controller";
import { validateMiddlware } from "../../middlewares/shared/validate.middleware";
import { getOrdersQuerySchema } from "../../validations/admin/order.validation";

router.get("/",validateMiddlware(getOrdersQuerySchema), controller.getOrders);

export default router;