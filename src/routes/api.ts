import express from "express";
import * as api from "../api/index.js";
import verify from "../middleware/verify.js";

const router = express.Router();

router.post("/api/v2/login", api.login);
router.post("/api/v2/signup", api.signup);
router.post("/api/v2/activate", api.activate);
router.post("/api/v2/verify", verify, api.authorize);

router.use(verify);
router.get("/api/v2/todos", api.getTodos);
router.put("/api/v2/todos", api.updateTodo);
router.post("/api/v2/todos", api.insertTodo);
router.delete("/api/v2/todos", api.deleteTodo);

export default router;
