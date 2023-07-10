import "../declare.js";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface ICookieUser {
    id: string;
    iat: number;
    exp: number;
}

export default function verify(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.cookies.token ?? "";
    try {
        const { id } = jwt.verify(
            token,
            process.env.SECRET_KEY as string
        ) as ICookieUser;

        req.ctx = { id };
        return next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Invalid token" });
    }
}
