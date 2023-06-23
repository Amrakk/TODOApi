import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export default function verify(req: Request, res: Response) {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];

    try {
        const user = jwt.verify(
            token as string,
            process.env.SECRET_KEY as string
        );

        if (!user) return res.status(400).json({ message: "Invalid token" });
        return res.status(200).json({ message: "Valid token", user: user });
    } catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
}
