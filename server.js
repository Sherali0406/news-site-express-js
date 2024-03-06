// server.js
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const colors = require("colors");
const path = require("path");
const fileupload = require("express-fileupload");
dotenv.config({ path: "./config/config.env" });
const cors = require("cors");

connectDB();

const categories = require("./routes/categories");
const posts = require("./routes/posts");
const tags = require("./routes/tags");
const comments = require("./routes/comments");
const users = require("./routes/users");
const auth = require("./routes/auth");
const options = require("./routes/swagger");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

app.use(fileupload());

app.use(express.static(path.join(__dirname, "public")));

app.use("/tags", tags);
app.use("/categories", categories);
app.use("/posts", posts);
app.use("/comments", comments);
app.use("/users", users);
app.use("/auth", auth);

const PORT = process.env.PORT || 5000;

const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bgYellow
  )
);
