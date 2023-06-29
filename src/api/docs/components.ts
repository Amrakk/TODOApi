export default {
    schemas: {
        Todo: {
            type: "object",
            required: ["content"],
            properties: {
                id: {
                    type: "string",
                    description: "Todo ID",
                },
                content: {
                    type: "string",
                    description: "Todo content",
                },
                completed: {
                    type: "boolean",
                    description: "Todo status",
                },
            },
        },
        User: {
            type: "object",
            required: ["username", "password"],
            properties: {
                id: {
                    type: "string",
                    description: "User ID",
                },
                username: {
                    type: "string",
                    description: "Username",
                },
                password: {
                    type: "string",
                    description: "Harshed password",
                },
                todos: {
                    type: "array",
                    description: "Array of Todo",
                    items: {
                        $ref: "#/components/schemas/Todo",
                    },
                },
            },
        },
    },
    responses: {
        200: {
            description: "Successful operation",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "Ok",
                            },
                        },
                    },
                },
            },
        },
        400: {
            description: "Invalid request data",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "Bad request",
                            },
                        },
                    },
                },
            },
        },
    },
    securitySchemes: {
        cookieAuth: {
            description:
                "Use this token to access the API: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3ODU5YmUzLTc1OGEtNGUzNi05MjIzLWUzZDU1NWZjODY5ZCIsImlhdCI6MTY4ODA1MTc3MH0.7EqMyBMGzCW3x43Z93xKPRboQ3SuhfBoyadeuJS6M94",
            type: "apiKey",
            in: "cookie",
            name: "id",
        },
    },
};
