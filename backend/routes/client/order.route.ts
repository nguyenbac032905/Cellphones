import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/order.controller";
import { validateMiddlware } from "../../middlewares/shared/validate.middleware";
import { createOrderSchema, orderIDSchema } from "../../validations/client/order.validation";

router.post("/",validateMiddlware(createOrderSchema), controller.createOrder);
router.get("/:orderID",validateMiddlware(orderIDSchema), controller.getOrder);
router.get("/", controller.myOrders);

export default router;