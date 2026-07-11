import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/productCategories.controller";
import { validateMiddlware } from "../../middlewares/admin/validate.middleware";
import { getCategoriesSchema } from "../../validations/admin/productCategory.validation";

router.get("/tree", controller.getCategoryTree);
router.get("/",validateMiddlware(getCategoriesSchema), controller.getCategories);

export default router;