import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import database from "../../database/db.js";
import ITodo from "../../interfaces/todo.js";

export async function getTodos(req: Request, res: Response) {
    const id = req.body.id;

    const todos = await database.getTodos(id);
    if (!todos) return res.status(500).json({ message: "Failed to get todo" });

    return res.status(200).json({ message: "ok", todos: todos });
}

export async function updateTodo(req: Request, res: Response) {
    const id = req.body.id;
    const todo = req.body.todo ?? "";

    if (!todo) return res.status(400).json({ message: "No todo provided" });

    const updatedTodo = database.updateTodo(id, todo);
    if (!updatedTodo)
        return res.status(500).json({ message: "Todo is not updated" });

    return res.status(200).json({ message: "ok" });
}

export function deleteTodo(req: Request, res: Response) {
    const id = req.body.id;
    const todoID = req.body.todoID ?? "";

    if (!todoID) return res.status(400).json({ message: "No todo provided" });

    const deletedTodo = database.deleteTodo(id, todoID);
    if (!deletedTodo)
        return res.status(500).json({ message: "Todo is not deleted" });

    return res.status(200).json({ message: "ok" });
}

export async function insertTodo(req: Request, res: Response) {
    const id = req.body.id;
    const content = req.body.content as string;
    console.log(content);
    if (!content) return res.status(400).json({ message: "No todo provided" });

    if (content.length > 100)
        return res.status(400).json({ message: "Todo is too long" });

    const todos = await database.getTodos(id);
    if (!todos) return res.status(500).json({ message: "Failed to get todo" });

    if (todos.length >= 20)
        return res.status(400).json({ message: "Too many todos" });

    const todo: ITodo = {
        id: uuidv4(),
        content: content,
        completed: false,
    };

    const insertedTodo = database.insertTodo(id, todo);

    if (!insertedTodo)
        return res.status(500).json({ message: "Todo is not inserted" });

    return res.status(200).json({ message: "ok" });
}
