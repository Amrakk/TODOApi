import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import database from "../../../database/db.js";
import sendActivationURL from "../../../middleware/sendActivationURL.js";
import createAccessToken from "../../../middleware/createAccessToken.js";
import { valUsername, valPassword } from "../../../middleware/validateInput.js";

export default async function login(req: Request, res: Response) {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ message: "Invalid credentials" });
    if (!valUsername(username)) return res.status(401).json({ message: "Invalid credentials" });
    if (!valPassword(password)) return res.status(401).json({ message: "Invalid credentials" });

    const user = await database.getUserByUsername(username);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: "Invalid credentials" });

    if (user.isActivated === false) {
        const result = await sendActivationURL(user.email);
        if (!result)
            return res.status(500).json({
                message: "Error sending verification email",
            });
        return res.status(403).json({ message: "Account not activated" });
    }

    const access_token = createAccessToken(user.id);
    const ref_token = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET_KEY as string, {
        expiresIn: "7d",
    });

    res.cookie("ref_token", ref_token, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
    });
    res.cookie("access_token", access_token, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
    });
    return res.status(200).json({ message: "Valid credentials" });
}
