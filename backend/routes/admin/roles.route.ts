import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/roles.controller";
import { validateMiddlware } from "../../middlewares/admin/validate.middleware";
import { createRoleSchema, roleIDSchema, updateRoleSchema } from "../../validations/admin/role.validation";

router.get("/", controller.getRoles);
router.post("/",validateMiddlware(createRoleSchema), controller.createRole);
router.patch("/:roleID", validateMiddlware(updateRoleSchema), controller.updateRole);
router.get("/:roleID", validateMiddlware(roleIDSchema), controller.getRole);
router.delete("/:roleID", validateMiddlware(roleIDSchema), controller.deleteRole);

export default router;