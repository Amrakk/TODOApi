const todoPaths = {
    "/todos": {
        get: {
            tags: ["Todo"],
            summary: "Get all todos",
            security: [
                {
                    cookieAuth: [],
                },
            ],
            responses: {
                200: {
                    $ref: "#/components/responses/200",
                },
                401: {
                    $ref: "#/components/responses/401",
                },
                500: {
                    $ref: "#/components/responses/500",
                },
            },
        },
        put: {
            tags: ["Todo"],
            summary: "Update a todo",
            security: [
                {
                    cookieAuth: [],
                },
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Todo",
                        },
                    },
                },
            },
            responses: {
                200: {
                    $ref: "#/components/responses/200",
                },
                400: {
                    $ref: "#/components/responses/400",
                },
                401: {
                    $ref: "#/components/responses/401",
                },
                500: {
                    $ref: "#/components/responses/500",
                },
            },
        },
        post: {
            tags: ["Todo"],
            summary: "Insert a todo",
            operationId: "insertTodo",
            security: [
                {
                    cookieAuth: [],
                },
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["content"],
                            properties: {
                                content: {
                                    type: "string",
                                    description: "Todo content to be inserted",
                                    example: "Troll",
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                201: {
                    $ref: "#/components/responses/201",
                },
                400: {
                    $ref: "#/components/responses/400",
                },
                401: {
                    $ref: "#/components/responses/401",
                },
                500: {
                    $ref: "#/components/responses/500",
                },
            },
        },
        delete: {
            tags: ["Todo"],
            summary: "Delete a todo",
            security: [
                {
                    cookieAuth: [],
                },
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["id"],
                            properties: {
                                id: {
                                    type: "string",
                                    description: "Todo id to be deleted",
                                    example: "123abc",
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    $ref: "#/components/responses/200",
                },
                400: {
                    $ref: "#/components/responses/400",
                },
                401: {
                    $ref: "#/components/responses/401",
                },
                500: {
                    $ref: "#/components/responses/500",
                },
            },
        },
    },
};

export default todoPaths;
