import ITodo from "./todo.js";

interface IUser {
    id: string;
    username: string;
    password: string;
    todos: ITodo[];
}

export default IUser;
