import jwt from "jsonwebtoken";
import { valEmail } from "../../../middleware/validateInput.js";
import { Request, Response } from "express";
import database from "../../../database/db.js";

interface IEmailToken {
    email: string;
    iat: number;
    exp: number;
}

export default async function activate(req: Request, res: Response) {
    const { token } = req.query ?? "";
    if (!token) return res.status(400).json({ message: "Invalid token" });
    try {
        const { email } = jwt.verify(
            token.toString(),
            process.env.SECRET_KEY as string
        ) as IEmailToken;

        const result = await database.activateUser(email);
        if (!result)
            return res
                .status(500)
                .json({ message: "Something wrong. Try again later!" });
        if (result === 1)
            return res
                .status(400)
                .json({ message: "Account already activated" });

        return res.status(200).json({ message: "Account activated" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Invalid token" });
    }
}
