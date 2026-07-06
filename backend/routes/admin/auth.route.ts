import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/auth.controller";
import {authMiddleware} from "../../middlewares/admin/auth.middleware";
import { validateMiddlware } from "../../middlewares/admin/validate.middleware";
import { loginSchema,registerSchema } from "../../validations/admin/auth.validation";
import { loginRateLimitMiddleware,rateLimitRegisterMiddleware } from "../../middlewares/shared/rateLimit.middleware";

router.post("/login",loginRateLimitMiddleware,validateMiddlware(loginSchema), controller.login);
router.post("/register",rateLimitRegisterMiddleware,validateMiddlware(registerSchema), controller.register);
router.get("/refresh-token", controller.refreshToken);
router.get("/me",authMiddleware, controller.getMe);

export default router;