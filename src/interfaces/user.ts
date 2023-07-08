import ITodo from "./todo.js";

interface IUser {
    id: string;
    email: string;
    username: string;
    password: string;
    isActivated: boolean;
    todos: ITodo[];
}

export default IUser;
