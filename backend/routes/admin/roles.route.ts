import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/roles.controller";
import { validateMiddlware } from "../../middlewares/admin/validate.middleware";
import { createRoleSchema, roleIDSchema, updateRoleSchema } from "../../validations/admin/role.validation";
import { permissionMiddleware } from "../../middlewares/admin/permissionMiddleware";
import { PERMISSIONS } from "../../constants/permission";

router.get("/",permissionMiddleware(PERMISSIONS.ROLES.READ), controller.getRoles);
router.post("/",validateMiddlware(createRoleSchema),permissionMiddleware(PERMISSIONS.ROLES.CREATE), controller.createRole);
router.patch("/:roleID", validateMiddlware(updateRoleSchema),permissionMiddleware(PERMISSIONS.ROLES.UPDATE), controller.updateRole);
router.get("/:roleID", validateMiddlware(roleIDSchema),permissionMiddleware(PERMISSIONS.ROLES.READ), controller.getRole);
router.delete("/:roleID", validateMiddlware(roleIDSchema),permissionMiddleware(PERMISSIONS.ROLES.DELETE), controller.deleteRole);

export default router;