import { Request, Response } from "express";

export default async function logout(req: Request, res: Response) {
    res.clearCookie("ref_token");
    res.clearCookie("access_token");
    return res.status(200).json({ message: "Logged out" });
}
