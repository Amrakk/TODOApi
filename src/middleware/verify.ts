import "../declare.js";
import jwt from "jsonwebtoken";
import cache from "../database/cache.js";
import IIdCookie from "../interfaces/userCookie.js";
import createAccessToken from "./createAccessToken.js";
import { Request, Response, NextFunction } from "express";

export default async function verify(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const access_token = req.cookies.access_token ?? null;
    if (!access_token)
        return res.status(401).json({ message: "Invalid token" });

    let id = "";
    const access_payload = valToken(
        access_token,
        process.env.ACCESS_SECRET_KEY as string
    );
    if (!access_payload)
        return res.status(401).json({ message: "Invalid token" });
    if (access_payload === "expired") {
        const ref_token = req.cookies.ref_token ?? null;
        if (!ref_token)
            return res.status(401).json({ message: "Invalid token" });

        const ref_payload = valToken(
            ref_token,
            process.env.REFRESH_SECRET_KEY as string
        );
        if (
            !ref_payload ||
            ref_payload === "expired" ||
            !(await cache.verifyRefToken(ref_payload.id, ref_token))
        )
            return res.status(401).json({ message: "Invalid token" });

        const new_access_token = createAccessToken(ref_payload.id);
        res.cookie("access_token", new_access_token, {
            secure: true,
            httpOnly: true,
            sameSite: "none",
        });
        id = ref_payload.id;
    } else id = access_payload.id;

    req.ctx = { id };
    return next();
}

function valToken(token: string, secret = "") {
    try {
        const decoded = jwt.verify(token, secret) as IIdCookie;
        return decoded ? decoded : null;
    } catch (err: jwt.VerifyErrors | any) {
        if (err.name !== "TokenExpiredError") return null;
        return "expired";
    }
}
