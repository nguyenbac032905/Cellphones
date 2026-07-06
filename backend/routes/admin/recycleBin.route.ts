import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/recycleBin.controller";
import { productIDSchema } from "../../validations/admin/product.validation";
import { validateMiddlware } from "../../middlewares/admin/validate.middleware";
import { forceDeleteRateLimit } from "../../middlewares/admin/rateLimit.middleware";

router.get("/products", controller.products);
router.patch("/products/:productID/restore",validateMiddlware(productIDSchema), controller.restoreProduct);
router.delete("/products/:productID/force",forceDeleteRateLimit,validateMiddlware(productIDSchema), controller.forceProduct)

export default router;