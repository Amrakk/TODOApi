import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import database from "../../database/db.js";
import ITodo from "../../interfaces/todo.js";
import IUser from "../../interfaces/user.js";

export async function getTodos(req: Request, res: Response) {
    const username = req.query.username as string;

    if (!username) {
        return res.status(400).json({ message: "No username provided" });
    }

    const todos = await database.getTodos(username);
    if (!todos) {
        return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "ok", todos: todos });
}

export async function updateTodo(req: Request, res: Response) {
    const username = req.query.username as string;
    const todo = req.body.todo as ITodo;

    if (!username) {
        return res.status(400).json({ message: "No username provided" });
    }
    if (!todo) {
        return res.status(400).json({ message: "No todo provided" });
    }

    const user = database.getUser(username);
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const updatedTodo = database.updateTodo(username, todo);
    if (!updatedTodo) {
        return res.status(400).json({ message: "Todo is not updated" });
    }
    return res.status(200).json({ message: "ok" });
}

export function deleteTodo(req: Request, res: Response) {
    const username = req.query.username as string;
    const todo = req.body.todo as ITodo;

    if (!username) {
        return res.status(400).json({ message: "No username provided" });
    }
    if (!todo) {
        return res.status(400).json({ message: "No todo provided" });
    }

    const user = database.getUser(username);
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const deletedTodo = database.deleteTodo(username, todo);
    if (!deletedTodo) {
        return res.status(400).json({ message: "Todo is not deleted" });
    }
    return res.status(200).json({ message: "ok" });
}

export function insertTodo(req: Request, res: Response) {
    const username = req.query.username as string;
    const content = req.body.todo as string;

    if (!username) {
        return res.status(400).json({ message: "No username provided" });
    }
    if (!content) {
        return res.status(400).json({ message: "No todo provided" });
    }

    const todo: ITodo = {
        id: uuidv4(),
        content: content,
        completed: false,
    };

    const user = database.getUser(username);
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const insertedTodo = database.insertTodo(username, todo);

    if (!insertedTodo) {
        return res.status(400).json({ message: "Todo is not inserted" });
    }
    return res.status(200).json({ message: "ok" });
}
