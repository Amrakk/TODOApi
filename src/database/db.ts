import { MongoClient } from "mongodb";
import IUser from "../interfaces/user.js";
import ITodo from "../interfaces/todo.js";

const url = process.env.DB_URL ?? "";
const client = new MongoClient(url);

const init = async () => {
    try {
        await client.connect();

        const db = client.db("TodoDB");

        const collections = await db.collections();
        const collectionExists = collections.some(
            (collection) => collection.collectionName === "Users"
        );

        if (!collectionExists) {
            await db.createCollection("Users");
        }

        const users = db.collection<IUser>("Users");

        return users;
    } catch (err) {
        throw err;
    }
};

const insertUser = async (user: IUser) => {
    try {
        const users = await init();
        await users.insertOne(user);

        return true;
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        if (client) await client.close();
    }
};

const insertTodo = async (username: string, todo: ITodo) => {
    try {
        const users = await init();

        await users.updateOne(
            { username: username },
            { $push: { todos: todo } }
        );

        return true;
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        if (client) await client.close();
    }
};

const updateTodo = async (username: string, todo: ITodo) => {
    try {
        const users = await init();

        await users.updateOne(
            { username: username, todos: { $elemMatch: { id: todo.id } } },
            { $set: { "todos.$.completed": todo.completed } }
        );

        return true;
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        if (client) await client.close();
    }
};

const deleteTodo = async (username: string, todo: ITodo) => {
    try {
        const users = await init();

        await users.updateOne(
            { username: username },
            { $pull: { todos: todo } }
        );

        return true;
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        if (client) await client.close();
    }
};

const getUser = async (username: string) => {
    try {
        const users = await init();
        const user = users.findOne({ username: username });

        return user;
    } catch (err) {
        console.log(err);
        return undefined;
    } finally {
        if (client) await client.close();
    }
};

const database = {
    insertUser: insertUser,
    insertTodo: insertTodo,
    deleteTodo: deleteTodo,
    updateTodo: updateTodo,
    getUser: getUser,
};

export default database;
