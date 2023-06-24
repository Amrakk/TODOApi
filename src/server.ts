import express from "express";
import router from "./routes/api.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./api/index.js";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
