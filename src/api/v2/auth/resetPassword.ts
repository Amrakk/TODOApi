import bcrypt from "bcrypt";
import { Request, Response } from "express";
import database from "../../../database/db.js";
import cache from "../../../database/OTPCache.js";
import { valEmail, valPassword } from "../../../middleware/validateInput.js";

export default async function resetPassword(req: Request, res: Response) {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password)
        return res.status(400).json({ message: "Invalid request" });
    if (!valEmail(email))
        return res.status(400).json({ message: "Invalid email" });
    if (!valPassword(password))
        return res.status(400).json({ message: "Invalid password" });

    const isVerified = await cache.verifyOTP(email, otp);
    if (!isVerified) return res.status(403).json({ message: "Invalid OTP" });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const isUpdated = await database.updatePassword(email, hash);
    if (!isUpdated)
        return res.status(500).json({ message: "Internal server error" });

    return res.status(200).json({ message: "Password updated" });
}
