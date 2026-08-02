import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/dashboard.controller";

router.get("/stats", controller.getStats);
router.get("/order-pipeline", controller.orderPipeline)

export default router;