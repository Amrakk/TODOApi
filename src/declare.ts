declare global {
    namespace Express {
        interface Request {
            ctx: {
                id: string;
            };
        }
    }
}
export {};
