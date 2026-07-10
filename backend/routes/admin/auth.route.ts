import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/auth.controller";
import {authMiddleware} from "../../middlewares/admin/auth.middleware";
import { validateMiddlware } from "../../middlewares/admin/validate.middleware";
import { loginSchema } from "../../validations/admin/auth.validation";
import { loginRateLimitMiddleware} from "../../middlewares/shared/rateLimit.middleware";

router.post("/login",loginRateLimitMiddleware,validateMiddlware(loginSchema), controller.login);
router.post("/logout",authMiddleware, controller.logout)
// router.post("/register",rateLimitRegisterMiddleware,validateMiddlware(registerSchema), controller.register);
router.get("/refresh-token", controller.refreshToken);
router.get("/me",authMiddleware, controller.getMe);

export default router;