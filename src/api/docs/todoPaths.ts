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
                400: {
                    $ref: "#/components/responses/400",
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
                            type: "string",
                            description: "Todo content to be inserted",
                            example: "Troll",
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
                            type: "string",
                            description: "Todo id to be deleted",
                            example: "123abc",
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
            },
        },
    },
};

export default todoPaths;
