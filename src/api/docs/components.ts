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
                email: {
                    type: "string",
                    description: "User email",
                },
                username: {
                    type: "string",
                    description: "Username",
                },
                password: {
                    type: "string",
                    description: "Harshed password",
                },
                isActivated: {
                    type: "boolean",
                    description: "User status",
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
        201: {
            description: "Successful created",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "Created",
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
        401: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "Unauthorized",
                            },
                        },
                    },
                },
            },
        },
        403: {
            description: "Forbidden",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "Forbidden",
                            },
                        },
                    },
                },
            },
        },
        409: {
            description: "Conflict",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Conflict",
                                    },
                                    data: {
                                        type: "array",
                                        description:
                                            "Array of returned data. (recommended username)",
                                        items: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        500: {
            description: "Internal server error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "Internal server error",
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
