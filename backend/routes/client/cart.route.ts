import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/cart.controller";
import { validateMiddlware } from "../../middlewares/shared/validate.middleware";
import { bulkDeleteItemSchema, cartItemSchema, deleteItemSchema } from "../../validations/client/cart.validation";

router.get("/", controller.getCart);
router.post("/items",validateMiddlware(cartItemSchema), controller.addItem);
router.patch("/items",validateMiddlware(cartItemSchema), controller.editItem);
router.delete("/items",validateMiddlware(deleteItemSchema), controller.deleteItem);
router.delete("/items/bulk",validateMiddlware(bulkDeleteItemSchema), controller.bulkDeleteItem);
export default router;