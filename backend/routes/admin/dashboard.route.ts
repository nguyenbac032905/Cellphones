import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/dashboard.controller";
import { validateMiddlware } from "../../middlewares/shared/validate.middleware";
import { saleQuerySchema } from "../../validations/admin/dashboard.validation";

router.get("/stats", controller.getStats);
router.get("/order-pipeline", controller.orderPipeline);
router.get("/sale-week",validateMiddlware(saleQuerySchema), controller.saleWeek);

export default router;