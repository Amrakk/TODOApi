import nodemailer from "nodemailer";
import cache from "../database/OTPCache.js";

export default async function sendForgotOTP(email: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    const otp = await cache.setOTP(email);
    if (!otp) return false;

    const mailOptions = {
        from: "hoangduy12823@gmail.com",
        to: email,
        subject: "Reset Password",
        text:
            "Enter this OTP to reset your password: " +
            otp +
            "\n\nThis OTP will expire in 5 minutes!!!",
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
