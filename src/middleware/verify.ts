import "../declare.js";
import jwt from "jsonwebtoken";
import IIdCookie from "../interfaces/userCookie.js";
import { Request, Response, NextFunction } from "express";

export default function verify(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const token = req.cookies.token ?? null;
        if (!token) return res.status(401).json({ message: "Invalid token" });

        const { id } = jwt.verify(
            token,
            process.env.SECRET_KEY as string
        ) as IIdCookie;

        req.ctx = { id };
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
