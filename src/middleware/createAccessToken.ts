import jwt from "jsonwebtoken";

export default function createAccessToken(id: string) {
    return jwt.sign({ id: id }, process.env.ACCESS_SECRET_KEY as string, {
        expiresIn: "15m",
    });
}
