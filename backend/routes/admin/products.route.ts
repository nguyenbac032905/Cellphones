import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/products.controller";
import { validateMiddlware } from "../../middlewares/admin/validate.middlewate";
import {createProductSchema, getProductsQuerySchema, productIDSchema, updateProductSchema} from "../../validations/admin/product.validation";

router.get("/",validateMiddlware(getProductsQuerySchema), controller.index);
router.get("/:productID",validateMiddlware(productIDSchema), controller.detail);
router.patch("/:productID",validateMiddlware(updateProductSchema), controller.updateProduct);
router.delete("/:productID",validateMiddlware(productIDSchema), controller.deleteProduct);
router.post("/",validateMiddlware(createProductSchema), controller.createProduct);

export default router;