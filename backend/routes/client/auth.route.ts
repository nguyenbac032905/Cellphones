import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/auth.controller";
import { validateMiddlware } from "../../middlewares/shared/validate.middleware";
import { loginRateLimitMiddleware, rateLimitRegisterMiddleware } from "../../middlewares/shared/rateLimit.middleware";
import { loginSchema, registerSchema, setPasswordSchema, verifyTokenSchema } from "../../validations/client/auth.validation";
import { authMiddleware } from "../../middlewares/client/auth.middleware";

router.post("/register",rateLimitRegisterMiddleware,validateMiddlware(registerSchema), controller.register);
router.post("/verify-otp", validateMiddlware(verifyTokenSchema), controller.verifyToken);
router.post("/set-password",validateMiddlware(setPasswordSchema), controller.setPassword);

router.post("/login",loginRateLimitMiddleware,validateMiddlware(loginSchema), controller.login);
router.get("/refresh-token", controller.refreshToken);
router.get("/me",authMiddleware, controller.getMe);

export default router;