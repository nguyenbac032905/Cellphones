import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/branches.controller";

router.get("/", controller.getBranches);
export default router;
