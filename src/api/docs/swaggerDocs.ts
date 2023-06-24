import swaggerJSDoc from "swagger-jsdoc";

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
    ],
    paths: {},
};

const options = {
    swaggerDefinition,
    apis: ["./src/api/v1/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
