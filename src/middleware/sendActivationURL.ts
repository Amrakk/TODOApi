import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export default async function sendActivationURL(email: string) {
    const host = process.env.CLIENT_HOST ?? "";

    const token = jwt.sign({ email: email }, process.env.SECRET_KEY as string, {
        expiresIn: "20m",
    });

    const url = `${host}?token=${token}`;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "hoangduy12823@gmail.com",
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: "hoangduy12823@gmail.com",
        to: email,
        subject: "Account Activation",
        text:
            "Click the link to activate your account: " +
            url +
            "\n\nThis link will expire in 20 minutes!!!",
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
