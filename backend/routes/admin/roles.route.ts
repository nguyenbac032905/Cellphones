import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/roles.controller";
import { validateMiddlware } from "../../middlewares/admin/validate.middleware";
import { createRoleSchema } from "../../validations/admin/role.validation";

router.get("/", controller.getRoles);
router.post("/",validateMiddlware(createRoleSchema), controller.createRole)

export default router;