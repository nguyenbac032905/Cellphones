import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/productCategories.controller";
import { validateMiddlware } from "../../middlewares/shared/validate.middleware";
import { categoryParamSchema, createCategorySchema, getCategoriesSchema, updateCategorySchema } from "../../validations/admin/productCategory.validation";

router.get("/tree", controller.getCategoryTree);
router.get("/",validateMiddlware(getCategoriesSchema), controller.getCategories);
router.post("/",validateMiddlware(createCategorySchema), controller.createCategory);
router.patch("/:categoryID",validateMiddlware(updateCategorySchema), controller.updateCategory);
router.get("/:categoryID",validateMiddlware(categoryParamSchema), controller.getCategory);
router.delete("/:categoryID", validateMiddlware(categoryParamSchema), controller.deleteCategory);
export default router;