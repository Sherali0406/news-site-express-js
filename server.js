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

const posts = require("./routes/posts");
const users = require("./routes/users");
const auth = require("./routes/auth");

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

app.use(fileupload());

app.use(express.static(path.join(__dirname, "public")));

app.use("/posts", posts);
app.use("/users", users);
app.use("/auth", auth);

const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ message: err.message });
});

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bgYellow
  )
);
