const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const ejs = require("ejs");
const path = require("path");
const userRouter = require("./routes/users");

// connected to MongoDB
mongoose
  .connect("mongodb://localhost/User", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log("Connection error:", err));

// instantiate the express app
const app = express();

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes middleware
app.use("/users", userRouter);

// setup engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to User Model");
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).send("Page Not Found!");
});

// error handler middleware
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

// server listener
app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
