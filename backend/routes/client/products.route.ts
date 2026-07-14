import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/products.controller";

router.get("/", controller.index);
router.get("/:categorySlug/categories", controller.getProductsByCategory);
export default router;