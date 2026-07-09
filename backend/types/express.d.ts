import { File } from "multer";
import "express";
import { AuthenticatedUser } from "./auth.type";

declare global {
    namespace Express {
        interface Request {
            file?: Express.Multer.File;
            files?: Record<string, Express.Multer.File[]>;
            user?: AuthenticatedUser
        }
    }
}

export { };