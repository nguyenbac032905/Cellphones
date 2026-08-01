import { Request, Response, NextFunction } from "express";
import { uploadToCloudinary } from "../../helpers/uploadCloud";
export const uploadSingle = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const file = req.file;

        if (!file) return next();

        const isAudio = file.mimetype.startsWith("audio/");

        const url = await uploadToCloudinary(
            file.buffer,
            isAudio ? "video" : "image"
        );

        req.body[file.fieldname] = url;

        next();
    } catch (err) {
        next(err);
    }
};
export const uploadFields = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const files = req.files as | Record<string, Express.Multer.File[]> | undefined;
        
        if (!files) return next();

        for (const field in files) {
            req.body[field] = await Promise.all(
                files[field].map(async (file) => {
                    const isAudio = file.mimetype.startsWith("audio/");

                    return uploadToCloudinary(
                        file.buffer,
                        isAudio ? "video" : "image"
                    );
                })
            );
        }

        next();
    } catch (err) {
        next(err);
    }
};