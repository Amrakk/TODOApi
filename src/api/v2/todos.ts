import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import database from "../../database/db.js";
import ITodo from "../../interfaces/todo.js";

export async function getTodos(req: Request, res: Response) {
    const id = req.ctx.id;

    const todos = await database.getTodos(id);
    if (!todos) return res.status(500).json({ message: "Error getting todo" });

    return res.status(200).json({ message: "Todos get", todos: todos });
}

export async function updateTodo(req: Request, res: Response) {
    const id = req.ctx.id;
    const todo = req.body.todo ?? "";

    if (!todo) return res.status(400).json({ message: "No todo provided" });
    if (todo.content.length > 100)
        return res.status(400).json({ message: "Todo content is too long" });

    const updatedTodo = await database.updateTodo(id, todo);
    if (!updatedTodo)
        return res.status(500).json({ message: "Error updating todo" });

    return res.status(200).json({ message: "Todo updated" });
}

export async function deleteTodo(req: Request, res: Response) {
    const id = req.ctx.id;
    const todoIDs = req.body.todoIDs ?? "";

    if (!todoIDs) return res.status(400).json({ message: "No todo provided" });

    while (todoIDs.length > 0) {
        const deletedTodo = await database.deleteTodo(id, todoIDs.pop());
        if (!deletedTodo)
            return res.status(500).json({ message: "Error deleting todo" });
    }

    return res.status(200).json({ message: "Todo deleted" });
}

export async function insertTodo(req: Request, res: Response) {
    const id = req.ctx.id;
    const content = req.body.content as string;

    if (!content) return res.status(400).json({ message: "No todo provided" });
    if (content.length > 100)
        return res.status(400).json({ message: "Todo content is too long" });

    const todos = await database.getTodos(id);
    if (!todos)
        return res.status(500).json({ message: "Error inserting todo" });
    if (todos.length >= 20)
        return res.status(400).json({ message: "Too many todos" });

    const todo: ITodo = {
        id: uuidv4(),
        content: content,
        completed: false,
    };

    const insertedTodo = await database.insertTodo(id, todo);
    if (!insertedTodo)
        return res.status(500).json({ message: "Error inserting todo" });

    return res.status(201).json({ message: "Todo created" });
}
