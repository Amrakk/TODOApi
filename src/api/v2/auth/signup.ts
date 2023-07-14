import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import database from "../../../database/db.js";
import IUser from "../../../interfaces/user.js";
import sendActivationURL from "../../../middleware/sendActivationURL.js";
import recommendedUsername from "../../../middleware/usernameGenerator.js";
import {
    valEmail,
    valPassword,
    valUsername,
} from "../../../middleware/validateInput.js";

export default async function signup(req: Request, res: Response) {
    const { username, password, email } = req.body;

    if (!username || !password || !email)
        return res
            .status(400)
            .json({ message: "Invalid credentials", data: [] });
    if (!valEmail(email))
        return res.status(400).json({ message: "Invalid email", data: [] });
    if (!valUsername(username))
        return res.status(400).json({ message: "Invalid username", data: [] });
    if (!valPassword(password))
        return res.status(400).json({ message: "Invalid password", data: [] });
    if (await database.getUserByEmail(email))
        return res
            .status(400)
            .json({ message: "Email already exists", data: [] });
    if (await database.getUserByUsername(username))
        return res.status(400).json({
            message: "Username already exists",
            data: await recommendedUsername(username),
        });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const data: IUser = {
        id: uuidv4(),
        email: email,
        username: username,
        password: hash,
        isActivated: false,
        todos: [],
    };

    const insertResult = await database.insertUser(data);
    if (!insertResult)
        return res.status(500).json({ message: "Error creating user" });

    const sendResult = await sendActivationURL(data.email);
    if (!sendResult)
        return res.status(500).json({
            message: "Error sending verification email. Try again later!",
        });

    return res.status(201).json({ message: "User created" });
}
