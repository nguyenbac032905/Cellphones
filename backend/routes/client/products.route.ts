import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/products.controller";
import { validateMiddlware } from "../../middlewares/shared/validate.middleware";
import { getProductsSchema } from "../../validations/client/product.validation";

router.get("/",validateMiddlware(getProductsSchema), controller.getProducts);
router.get("/:categorySlug/categories", controller.getProductsByCategory);
export default router;