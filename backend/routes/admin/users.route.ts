import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/users.controller";
import { validateMiddlware } from "../../middlewares/admin/validate.middleware";
import { getUsersServiceSchema } from "../../validations/admin/users.validation";

router.get("/",validateMiddlware(getUsersServiceSchema), controller.getUsers);

export default router;