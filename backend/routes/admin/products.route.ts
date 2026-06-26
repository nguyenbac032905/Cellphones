import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/products.controller";

router.get("/", controller.index);
router.patch("/:productID", controller.updateProduct);

export default router;