export function valEmail(email: string) {
    var emailRegex = new RegExp(
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
    );
    return emailRegex.test(email);
}

export function valUsername(username: string) {
    var usernameRegex = new RegExp("^[a-z0-9]+$");
    return usernameRegex.test(username);
}

export function valPassword(password: string) {
    var passwordRegex = new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{8,15}$"
    );
    return passwordRegex.test(password);
}
