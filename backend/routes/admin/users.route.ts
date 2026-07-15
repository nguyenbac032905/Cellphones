import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/users.controller";
import { validateMiddlware } from "../../middlewares/shared/validate.middleware";
import { createUserSchema, getUsersServiceSchema, updateUserSchema, userIDParamsSchema } from "../../validations/admin/users.validation";
import { permissionMiddleware } from "../../middlewares/admin/permissionMiddleware";
import { PERMISSIONS } from "../../constants/permission";

router.get("/",validateMiddlware(getUsersServiceSchema),permissionMiddleware(PERMISSIONS.USERS.READ), controller.getUsers);
router.post("/",validateMiddlware(createUserSchema),permissionMiddleware(PERMISSIONS.USERS.CREATE),controller.createUser);
router.get("/:userID",validateMiddlware(userIDParamsSchema),permissionMiddleware(PERMISSIONS.USERS.READ), controller.getUser);
router.patch("/:userID",validateMiddlware(updateUserSchema),permissionMiddleware(PERMISSIONS.USERS.UPDATE), controller.updateUser);
router.delete("/:userID",validateMiddlware(userIDParamsSchema),permissionMiddleware(PERMISSIONS.USERS.DELETE), controller.deleteUser);


export default router;