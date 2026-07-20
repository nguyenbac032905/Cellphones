import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/auth.controller";
import { validateMiddlware } from "../../middlewares/shared/validate.middleware";
import { rateLimitRegisterMiddleware } from "../../middlewares/shared/rateLimit.middleware";
import { registerSchema, setPasswordSchema, verifyTokenSchema } from "../../validations/client/auth.validation";

router.post("/register",rateLimitRegisterMiddleware,validateMiddlware(registerSchema), controller.register);
router.post("/verify-otp", validateMiddlware(verifyTokenSchema), controller.verifyToken);
router.post("/set-password",validateMiddlware(setPasswordSchema), controller.setPassword);

export default router;