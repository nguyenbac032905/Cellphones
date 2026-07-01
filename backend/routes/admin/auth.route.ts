import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/auth.controller";
import {authMiddleware} from "../../middlewares/admin/auth.middleware";

router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/refresh-token", controller.refreshToken);
router.post("/me",authMiddleware, controller.getMe);

export default router;