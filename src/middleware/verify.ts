import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface User {
    id: string;
    iat: number;
    exp: number;
}

export default function verify(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.cookies.token;

    try {
        const user = jwt.verify(
            token,
            process.env.SECRET_KEY as string
        ) as User;

        if (!user) return res.status(400).json({ message: "Invalid token" });

        req.body.id = user.id;
        return next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
}
