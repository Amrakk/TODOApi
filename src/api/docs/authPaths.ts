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
                401: {
                    $ref: "#/components/responses/401",
                },
                403: {
                    $ref: "#/components/responses/403",
                },
                500: {
                    $ref: "#/components/responses/500",
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
                                email: {
                                    type: "string",
                                    example: "example@gmail.com",
                                },
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
                201: {
                    $ref: "#/components/responses/201",
                },
                400: {
                    $ref: "#/components/responses/400",
                },
                409: {
                    $ref: "#/components/responses/409",
                },
                500: {
                    $ref: "#/components/responses/500",
                },
            },
        },
    },
    "/activate": {
        post: {
            tags: ["Auth"],
            summary: "Activate user account",
            parameters: [
                {
                    in: "query",
                    name: "token",
                    schema: {
                        type: "string",
                        description: "Token from email",
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
                401: {
                    $ref: "#/components/responses/401",
                },
                500: {
                    $ref: "#/components/responses/500",
                },
            },
        },
    },
    "/verify": {
        post: {
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
                401: {
                    $ref: "#/components/responses/401",
                },
            },
        },
    },
    "/logout": {
        post: {
            tags: ["Auth"],
            summary: "Logout from the application",
            parameters: [
                {
                    in: "cookie",
                    name: "token",
                    schema: {
                        type: "string",
                        description: "Token from cookie",
                    },
                },
            ],
            responses: {
                200: {
                    $ref: "#/components/responses/200",
                },
                401: {
                    $ref: "#/components/responses/401",
                },
            },
        },
    },
    "/forgot-password": {
        post: {
            tags: ["Auth"],
            summary: "Send reset password otp to user email",
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["email"],
                            properties: {
                                email: {
                                    type: "string",
                                    description: "User email",
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
                404: {
                    $ref: "#/components/responses/404",
                },
                500: {
                    $ref: "#/components/responses/500",
                },
            },
        },
    },
    "/reset-password": {
        post: {
            tags: ["Auth"],
            summary: "Reset user password",
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["otp", "password"],
                            properties: {
                                email: {
                                    type: "string",
                                    description: "User email",
                                },
                                otp: {
                                    type: "string",
                                    description: "OTP from email",
                                },
                                password: {
                                    type: "string",
                                    description: "New password",
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
                403: {
                    $ref: "#/components/responses/403",
                },
                500: {
                    $ref: "#/components/responses/500",
                },
            },
        },
    },
};

export default authPaths;
