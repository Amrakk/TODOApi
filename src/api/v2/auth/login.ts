import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import sendActivationURL from "../../../middleware/sendActivationURL.js";
import database from "../../../database/db.js";
import { valUsername, valPassword } from "../../../middleware/validateInput.js";

export default async function login(req: Request, res: Response) {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ message: "Invalid credentials" });
    if (!valUsername(username))
        return res.status(400).json({ message: "Invalid credentials" });
    if (!valPassword(password))
        return res.status(400).json({ message: "Invalid credentials" });

    const user = await database.getUserByUsername(username);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    else if (!bcrypt.compareSync(password, user.password))
        return res.status(400).json({ message: "Invalid credentials" });

    if (user.isActivated === false) {
        const result = await sendActivationURL(user.email);
        if (!result)
            return res.status(500).json({
                message: "Error sending verification email. Try again later!",
            });
        return res.status(400).json({ message: "Account not activated" });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, {
        expiresIn: "5h",
    });

    res.cookie("token", token);
    return res.status(200).json({ message: "Valid credentials" });
}
