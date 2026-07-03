import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/auth.controller";
import {authMiddleware} from "../../middlewares/admin/auth.middleware";
import { validateMiddlware } from "../../middlewares/admin/validate.middlewate";
import { loginSchema,registerSchema } from "../../validations/admin/auth.validation";

router.post("/login",validateMiddlware(loginSchema), controller.login);
router.post("/register",validateMiddlware(registerSchema), controller.register);
router.get("/refresh-token", controller.refreshToken);
router.get("/me",authMiddleware, controller.getMe);

export default router;