import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/recycleBin.controller";
import { productIDSchema } from "../../validations/admin/product.validation";
import { validateMiddlware } from "../../middlewares/admin/validate.middleware";
import { forceDeleteRateLimit } from "../../middlewares/shared/rateLimit.middleware";
import { permissionMiddleware } from "../../middlewares/admin/permissionMiddleware";
import { PERMISSIONS } from "../../constants/permission";

router.get("/products",permissionMiddleware(PERMISSIONS.PRODUCTS.READ), controller.products);
router.patch("/products/:productID/restore",validateMiddlware(productIDSchema),permissionMiddleware(PERMISSIONS.PRODUCTS.UPDATE), controller.restoreProduct);
router.delete("/products/:productID/force",forceDeleteRateLimit,validateMiddlware(productIDSchema),permissionMiddleware(PERMISSIONS.PRODUCTS.DELETE), controller.forceProduct)

export default router;