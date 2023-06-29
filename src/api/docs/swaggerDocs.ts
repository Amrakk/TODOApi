import swaggerJSDoc from "swagger-jsdoc";
import components from "./components.js";
import authPaths from "./authPaths.js";
import todoPaths from "./todoPaths.js";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "TODO API",
        version: "1.0.0",
        description: "TODO API Documentation",
    },
    servers: [
        {
            url: "http://localhost:3000/api/v1/",
            description: "Development server",
        },
        {
            url: "https://todoapi-uxe5.onrender.com/api/v1/",
            description: "Production server",
        },
    ],
    tags: [
        {
            name: "Auth",
            description: "Everything about authentication",
        },
        {
            name: "Todo",
            description: "CRUD operations on TODOs",
        },
    ],
    paths: { ...authPaths, ...todoPaths },
    components: components,
};

const options = {
    swaggerDefinition,
    apis: ["./src/api/v1/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
