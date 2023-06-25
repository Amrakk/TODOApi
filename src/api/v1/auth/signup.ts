import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import database from "../../../database/db.js";
import IUser from "../../../interfaces/user.js";

export default async function signup(req: Request, res: Response) {
    const { username, password } = req.body;

    if (await database.getUser(username))
        return res.status(400).json({ message: "Username already exists" });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const data: IUser = {
        id: uuidv4(),
        username: username,
        password: hash,
        todos: [],
    };

    const result = await database.insertUser(data);
    if (!result)
        return res.status(500).json({ message: "Error creating user" });

    return res.status(201).json({ message: "User created" });
}
