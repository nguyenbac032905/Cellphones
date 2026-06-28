import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/uploads.controller";
import * as middleware from "../../middlewares/admin/uploadCloud.middleware";
import multer = require("multer");
const upload = multer();

router.post("/images",upload.fields([{ name: "images", maxCount: 10 }]),middleware.uploadFields,  controller.uploadImages);

export default router;