import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/order.controller";
import { validateMiddlware } from "../../middlewares/shared/validate.middleware";
import { createOrderSchema } from "../../validations/client/order.validation";

router.post("/",validateMiddlware(createOrderSchema), controller.createOrder);

export default router;