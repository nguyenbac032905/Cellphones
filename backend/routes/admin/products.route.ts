import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/products.controller";

router.get("/", controller.index);
router.get("/:productID", controller.detail);
router.patch("/:productID", controller.updateProduct);
router.delete("/:productID", controller.deleteProduct);

export default router;