import database from "../database/db.js";

export default async function recommendedUsername(username: string) {
    const usernames: string[] = [];

    while (usernames.length < 3) {
        const generatedUsername = await generateUsername(username);
        if (
            !(await isUsernameExist(generatedUsername)) &&
            !usernames.includes(generatedUsername)
        )
            usernames.push(generatedUsername);
    }

    return usernames;
}

function generateUsername(username: string) {
    return new Promise<string>((resolve, reject) => {
        let randomString = "";
        for (let i = 0; i < 3; i++)
            randomString += Math.floor(Math.random() * 10).toString();

        const alphabeticPosition = Math.floor(Math.random() * 4);
        const alphaCharCode = Math.floor(Math.random() * 26) + 65;

        randomString =
            randomString.substring(0, alphabeticPosition) +
            String.fromCharCode(alphaCharCode) +
            randomString.substring(alphabeticPosition);

        const generatedUsername = username + randomString;

        if (generatedUsername) resolve(generatedUsername);
        else reject("Failed to generate a username.");
    });
}

async function isUsernameExist(username: string) {
    const user = await database.getUserByUsername(username);
    if (user) return true;
    return false;
}
