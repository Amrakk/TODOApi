import express from "express";
import {
    login,
    signup,
    verify,
    insertTodo,
    deleteTodo,
    updateTodo,
} from "../api/index.js";

const router = express.Router();

router.post("/api/v1/login", login);
router.get("/api/v1/verify", verify);
router.post("/api/v1/signup", signup);
router.put("/api/v1/updateTodo", updateTodo);
router.post("/api/v1/insertTodo", insertTodo);
router.delete("/api/v1/deleteTodo", deleteTodo);

export default router;
