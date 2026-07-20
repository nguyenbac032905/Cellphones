import nodemailer from "nodemailer";
import { AppError } from "../utils/AppError";

type Props = {
    email: string;
    subject: string;
    html: string;
};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASS,
    },
});

export const sendMail = async ({ email, subject, html, }: Props): Promise<void> => {
    try {
        await transporter.sendMail({
            from: `"SMEMBER" <${process.env.EMAIL_USER}>`,
            to: email,
            subject,
            html,
        });
    } catch (error) {
        throw new AppError( error instanceof Error ? error.message : "Không thể gửi email", 500 );
    }
};