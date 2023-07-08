import { Request, Response } from "express";

export default function authorize(req: Request, res: Response) {
    return res.status(200).json({ message: "Valid credential" });
}
