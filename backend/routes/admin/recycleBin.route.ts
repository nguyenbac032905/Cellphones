import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/recycleBin.controller";
import { productIDSchema } from "../../validations/admin/product.validation";
import { validateMiddlware } from "../../middlewares/admin/validate.middlewate";

router.get("/products", controller.products);
router.patch("/products/:productID/restore",validateMiddlware(productIDSchema), controller.restoreProduct);
router.delete("/products/:productID/force",validateMiddlware(productIDSchema), controller.forceProduct)

export default router;