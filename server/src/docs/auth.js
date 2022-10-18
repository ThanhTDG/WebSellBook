module.exports = {
  "/auth/signin": {
    post: {
      summary: "Sign in",
      tags: ["Auth"],
      description: "Sign in",
      operationId: "signIn",
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                username: {
                  type: "string",
                  description: "Email or phone number",
                },
                password: {
                  type: "string",
                  description: "Password",
                },
              },
              required: ["username", "password"],
              example: {
                username: "an@gmail.com",
                password: "123456abc",
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Sign in successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  token: {
                    type: "string",
                    description: "Token",
                  },
                },
                example: {
                  token: "631b2f6fb87b664e474eed57",
                },
              },
            },
          },
        },
      },
    },
  },
};
