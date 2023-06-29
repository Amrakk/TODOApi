const authPaths = {
    "/login": {
        post: {
            tags: ["Auth"],
            summary: "Login to the application",
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["username", "password"],
                            properties: {
                                username: {
                                    type: "string",
                                    example: "admin",
                                },
                                password: {
                                    type: "string",
                                    example: "admin",
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Login successful. Set cookie with token",
                    headers: {
                        "Set-Cookie": {
                            schema: {
                                type: "string",
                                description: "Cookie with token",
                            },
                        },
                    },
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Valid credential",
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    $ref: "#/components/responses/400",
                },
            },
        },
    },
    "/signup": {
        post: {
            tags: ["Auth"],
            summary: "Signup to the application",
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["username", "password"],
                            properties: {
                                username: {
                                    type: "string",
                                    example: "admin",
                                },
                                password: {
                                    type: "string",
                                    example: "admin",
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
            },
        },
    },
    "/verify": {
        get: {
            tags: ["Auth"],
            summary: "Get token from cookie then verify it",
            parameters: [
                {
                    in: "cookie",
                    name: "token",
                    schema: {
                        type: "string",
                        description: "Token from cookie",
                        example:
                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MTc3MH0.7EqMyBMGzCW3x43Z93xKPRboQ3SuhfBoyadeuJS6M94",
                    },
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
    },
};

export default authPaths;
