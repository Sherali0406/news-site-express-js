const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const fs = require("fs");

// const setupSwagger = (app) => {
//   // Dynamically load all route files
//   const routeFiles = fs
//     .readdirSync(path.join(__dirname, "routes"))
//     .map((file) => path.join(__dirname, "routes", file));

var options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Title",
      version: "1.0.0",
      description: "Your API Description",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: routeFiles, // Use the dynamically loaded route files
};

const specs = swaggerJsdoc(options);

// Add security middleware to set up security definitions for swagger-ui-express
const setSecurityMiddleware = (req, res, next) => {
  req.swaggerDoc = specs;
  next();
};

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

// };

module.exports = setupSwagger;
