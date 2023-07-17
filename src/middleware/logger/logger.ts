import settings from "./settings.js";
import { Request, Response, NextFunction } from "express";

export default function logger(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.on("finish", () => {
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
        let log =
            `${colors.magenta}[${ip}] ` +
            `${colors.cyan}[${timestamp}] ` +
            `${colors.green}${method} ` +
            `${colors.reset}- ` +
            `${colors.yellow}"${uri}" `;

        if (statusCode >= 400) log += `${colors.red}`;
        else if (statusCode >= 300) log += `${colors.yellow}`;
        else if (statusCode >= 200) log += `${colors.green}`;
        else log += `${colors.reset}`;

        log += `${statusCode}${colors.reset} -`;

        console.log(log);
    });
    return next();
}
