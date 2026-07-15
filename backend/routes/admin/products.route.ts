import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/products.controller";
import { validateMiddlware } from "../../middlewares/shared/validate.middleware";
import {createProductSchema, getProductsQuerySchema, productIDSchema, updateProductSchema} from "../../validations/admin/product.validation";
import { permissionMiddleware } from "../../middlewares/admin/permissionMiddleware";
import { PERMISSIONS } from "../../constants/permission";

router.get("/",validateMiddlware(getProductsQuerySchema),permissionMiddleware(PERMISSIONS.PRODUCTS.READ), controller.index);
router.get("/:productID",validateMiddlware(productIDSchema),permissionMiddleware(PERMISSIONS.PRODUCTS.READ), controller.detail);
router.patch("/:productID",validateMiddlware(updateProductSchema),permissionMiddleware(PERMISSIONS.PRODUCTS.UPDATE), controller.updateProduct);
router.delete("/:productID",validateMiddlware(productIDSchema),permissionMiddleware(PERMISSIONS.PRODUCTS.DELETE), controller.deleteProduct);
router.post("/",validateMiddlware(createProductSchema),permissionMiddleware(PERMISSIONS.PRODUCTS.CREATE), controller.createProduct);

export default router;