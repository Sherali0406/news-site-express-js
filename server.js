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
const swaggerRouter = require("./routes/swagger"); // Import the Swagger router

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

app.use(fileupload());

app.use(express.static(path.join(__dirname, "public")));

// Enable CORS (if needed)
// app.use(cors());

app.use("/tags", tags);
app.use("/categories", categories);
app.use("/posts", posts);
app.use("/comments", comments);
app.use("/users", users);
app.use("/auth", auth);

// Mount the Swagger router
app.use("/", swaggerRouter);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
