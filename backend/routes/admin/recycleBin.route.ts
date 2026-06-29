import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/recycleBin.controller";

router.get("/products", controller.products);
router.patch("/products/:productID/restore", controller.restoreProduct);
router.delete("/products/:productID/force", controller.forceProduct)

export default router;