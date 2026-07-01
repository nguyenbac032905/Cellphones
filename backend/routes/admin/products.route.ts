import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/products.controller";
import { validate } from "../../middlewares/admin/validate.middlewate";
import {createProductSchema, updateProductSchema} from "../../validations/admin/product.validation";

router.get("/", controller.index);
router.get("/:productID", controller.detail);
router.patch("/:productID",validate(updateProductSchema), controller.updateProduct);
router.delete("/:productID", controller.deleteProduct);
router.post("/",validate(createProductSchema), controller.createProduct);

export default router;