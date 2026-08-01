import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/chat.controller";
import { roomIDSchema } from "../../validations/admin/chat.validation";
import { validateMiddlware } from "../../middlewares/shared/validate.middleware";

router.get("/my-room", controller.getRoomChat);
router.get("/:roomID",validateMiddlware(roomIDSchema), controller.getMessages)
export default router;