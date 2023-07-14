import { Redis } from "ioredis";

const url =
    process.env.ENV === "production"
        ? process.env.REDIS_IN_URL ?? ""
        : process.env.REDIS_EX_URL ?? "";
let redis: Redis;

const init = async () => {
    try {
        redis = new Redis(url);
        console.log("Cache connected");
    } catch (err) {
        console.log(err);
    }
};

const close = async () => {
    try {
        redis.disconnect();
        console.log("Cache disconnected");
    } catch (err) {
        console.log(err);
    }
};

const setOTP = async (email: string) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    if ((await redis.set(email, otp, "EX", 60 * 5)) === "OK") return otp;
    return null;
};

const getOTP = async (email: string) => {
    return await redis.get(email);
};

const verifyOTP = async (email: string, otp: string) => {
    if ((await getOTP(email)) === otp) {
        redis.del(email);
        return true;
    }
    return false;
};

const cache = {
    init,
    close,
    setOTP,
    getOTP,
    verifyOTP,
};
export default cache;
