import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/uploads.controller";
import * as middleware from "../../middlewares/admin/uploadCloud.middleware";
import { uploadRateLimitMiddleware } from "../../middlewares/shared/rateLimit.middleware";
import multer = require("multer");
import { AppError } from "../../utils/AppError";
const upload = multer({
    limits: {
        fileSize: 1 * 1024 * 1024,
        files: 10
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(
                new AppError(
                    "Only jpg, png, webp images are allowed",
                    400
                )
            );
        }

        cb(null, true);
    }
});

router.post("/images",uploadRateLimitMiddleware,upload.fields([{ name: "images", maxCount: 10 }]),middleware.uploadFields,  controller.uploadImages);

export default router;