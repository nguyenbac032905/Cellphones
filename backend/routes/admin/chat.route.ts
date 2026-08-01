import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/chat.controller";
import { validateMiddlware } from "../../middlewares/shared/validate.middleware";
import { roomIDSchema } from "../../validations/admin/chat.validation";

router.get("/rooms", controller.getRooms);
router.get("/:roomID",validateMiddlware(roomIDSchema), controller.getMessages)

export default router;