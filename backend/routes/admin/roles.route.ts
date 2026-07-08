import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/roles.controller";

router.get("/", controller.getRoles);

export default router;