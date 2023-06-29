import express from "express";
import * as api from "../api/index.js";
import verify from "../middleware/verify.js";

const router = express.Router();

router.post("/api/v1/login", api.login);
router.post("/api/v1/signup", api.signup);
router.get("/api/v1/verify", verify, api.authorize);

router.use(verify);
router.get("/api/v1/todos", api.getTodos);
router.put("/api/v1/todos", api.updateTodo);
router.post("/api/v1/todos", api.insertTodo);
router.delete("/api/v1/todos", api.deleteTodo);

export default router;
