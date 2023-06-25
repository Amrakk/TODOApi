import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import database from "../../../database/db.js";

export default async function login(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await database.getUser(username);

    if (!user) return res.status(400).json({ message: "Invalid credential" });
    else if (!bcrypt.compareSync(password, user.password))
        return res.status(400).json({ message: "Invalid credential" });

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, {
        expiresIn: "5h",
    });

    res.cookie("token", token);
    return res.status(200).json({ message: "Valid credential" });
}
