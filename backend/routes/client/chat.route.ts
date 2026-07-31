import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/chat.controller";

router.get("/my-room", controller.getRoomChat);
export default router;