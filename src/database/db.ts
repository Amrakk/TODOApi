import IUser from "../interfaces/user.js";
import ITodo from "../interfaces/todo.js";
import { Collection, MongoClient } from "mongodb";

const url = process.env.DB_URL ?? "";
const client = new MongoClient(url);
let users: Collection<IUser>;

const init = async () => {
    try {
        await client.connect();

        const db = client.db("TodoDB");

        const collections = await db.collections();
        const collectionExists = collections.some(
            (collection) => collection.collectionName === "Users"
        );

        if (!collectionExists) await db.createCollection("Users");

        users = db.collection<IUser>("Users");
        console.log("Database connected");
    } catch (err) {
        console.log(err);
    }
};

const close = async () => {
    try {
        await client.close();
        console.log("Database disconnected");
    } catch (err) {
        console.log(err);
    }
};

const getUserByUsername = async (username: string) => {
    try {
        const user = users.findOne({ username: username });
        return user;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const getUserByEmail = async (email: string) => {
    try {
        const user = users.findOne({ email: email });
        return user;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const getUserByID = async (id: string) => {
    try {
        const user = users.findOne({ id: id });
        return user;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const insertUser = async (user: IUser) => {
    try {
        await users.insertOne(user);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const updatePassword = async (email: string, password: string) => {
    try {
        const result = await users.updateOne(
            { email: email },
            { $set: { password: password } }
        );

        return result.acknowledged;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const activateUser = async (email: string) => {
    try {
        const result = await users.updateOne(
            { email: email },
            { $set: { isActivated: true } }
        );

        if (result.modifiedCount === 0) return 1;
        return result.acknowledged;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const getTodos = async (id: string) => {
    try {
        const user = await getUserByID(id);
        if (user) return user.todos;
        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const insertTodo = async (id: string, todo: ITodo) => {
    try {
        const result = await users.updateOne(
            { id: id },
            { $push: { todos: todo } }
        );

        return result.acknowledged;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const updateTodo = async (id: string, todo: ITodo) => {
    try {
        const result = await users.updateOne(
            { id: id, todos: { $elemMatch: { id: todo.id } } },
            { $set: { "todos.$.completed": todo.completed } }
        );

        return result.acknowledged;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const deleteTodo = async (id: string, todoID: string) => {
    try {
        const result = await users.updateOne(
            { id: id, "todos.id": todoID },
            { $pull: { todos: { id: todoID } } }
        );

        return result.acknowledged;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const database = {
    init,
    close,
    getUserByID,
    getUserByEmail,
    getUserByUsername,
    insertUser,
    activateUser,
    updatePassword,
    getTodos,
    insertTodo,
    deleteTodo,
    updateTodo,
};

export default database;
