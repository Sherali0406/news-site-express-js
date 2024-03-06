// routes/swagger.js
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "news site rest api",
      version: "1.0.0",
      description: "This is a simple CRUD API",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Tag: {
          type: "object",
          required: ["name", "description"],
          properties: {
            name: {
              type: "string",
              description: "The name of the tag",
            },
            description: {
              type: "string",
              description: "The description of the tag",
            },
          },
        },
      },
      responses: {
        400: {
          description:
            "Missing API key - include it in the Authorization header",
          content: {
            "application/json": {},
          },
        },
        401: {
          description: "Unauthorized - incorrect API key or incorrect format",
          content: {
            "application/json": {},
          },
        },
        400: {
          description: "Not found - tag was not found",
          content: {
            "application/json": {},
          },
        },
      },
      securitySchemas: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },
    security:[{
      ApiKeyAuth:[]
    }]
  },
  apis: [
    // "./routes/categories.js",
    // "./routes/posts.js",
    "./routes/tags.js",
    // "./routes/comments.js",
    // "./routes/users.js",
    // "./routes/auth.js",
  ],
};

module.exports = options;
