import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/productCategories.controller";

router.get("/tree", controller.getCategoryTree);

export default router;