import IUser from "./interfaces/user.js";

declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}
