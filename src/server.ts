import cors from "cors";
import express from "express";
import router from "./routes/api.js";
import database from "./database/db.js";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./api/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(router);

app.listen(process.env.PORT, () => {
    database.init();
    console.log(`Server is running on port ${process.env.PORT}`);
});

app.on("close", () => {
    database.close();
    console.log("Server connection closed");
});
