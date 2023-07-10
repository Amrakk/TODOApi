import { valUsername } from "./validateInput.js";
import database from "../database/db.js";

export default async function recommendedUsername(username: string) {
    const usernames = [];
    while (usernames.length < 3) {
        const generatedUsername = await generateUsername(username, usernames);
        if (!(await isUsernameExist(generatedUsername)))
            usernames.push(generatedUsername);
    }
    return usernames;
}

async function generateUsername(username: string, usernames: string[]) {
    // TODO - validate generated username: use valUsername and not exist in usernames

    return "";
}

async function isUsernameExist(username: string) {
    const user = await database.getUserByUsername(username);
    if (user) return false;
    return true;
}
