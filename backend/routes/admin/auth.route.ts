import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/auth.controller";

router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/refresh-token", controller.refreshToken);

export default router;