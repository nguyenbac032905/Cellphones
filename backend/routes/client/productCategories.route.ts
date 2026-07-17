import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/productCategories.controller";

router.get("/tree", controller.getCategoryTree);
router.get("/:categorySlug", controller.getAllChildBySlug);
export default router;