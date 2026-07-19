import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/products.controller";
import { validateMiddlware } from "../../middlewares/shared/validate.middleware";
import { getProductsByCategorySchema, getProductSchema, getProductsSchema } from "../../validations/client/product.validation";

router.get("/",validateMiddlware(getProductsSchema), controller.getProducts);
router.get("/:productSlug",validateMiddlware(getProductSchema), controller.getProduct);
router.get("/:categorySlug/categories",validateMiddlware(getProductsByCategorySchema), controller.getProductsByCategory);
export default router;