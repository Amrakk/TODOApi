import settings from "./settings.js";
import { Request, Response, NextFunction } from "express";

export default function logger(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const ip = req.ip;
    const method = req.method.toUpperCase();
    const uri = req.url;
    const statusCode = res.statusCode;
    const timestamp = new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });

    const { colors } = settings;
    console.log(
        `${colors.cyan}[${timestamp}]${colors.reset} ` +
            `${colors.magenta}[${ip}]${colors.reset} ` +
            `${colors.green}${method}${colors.reset} - ` +
            `${colors.yellow}"${uri}"${colors.reset} ` +
            `${colors.red}${statusCode}${colors.reset} -`
    );

    return next();
}
