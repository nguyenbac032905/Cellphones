import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/users.controller";
import { validateMiddlware } from "../../middlewares/admin/validate.middleware";
import { createUserSchema, getUsersServiceSchema, updateUserSchema, userIDParamsSchema } from "../../validations/admin/users.validation";

router.get("/",validateMiddlware(getUsersServiceSchema), controller.getUsers);
router.post("/",validateMiddlware(createUserSchema),controller.createUser);
router.get("/:userID",validateMiddlware(userIDParamsSchema), controller.getUser);
router.patch("/:userID",validateMiddlware(updateUserSchema), controller.updateUser);
router.delete("/:userID",validateMiddlware(userIDParamsSchema), controller.deleteUser);

export default router;