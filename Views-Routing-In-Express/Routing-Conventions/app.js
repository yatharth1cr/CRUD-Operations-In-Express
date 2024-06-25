const express = require("express");
const logger = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const ejs = require("ejs");

// innstantiate the app
const app = express();

// require the routes
const studentsRouter = require("./routes/students");

// connect to mongoDB
mongoose
  .connect("mongodb://localhost/Students")
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

// middleware
app.use(logger("dev"));
app.use(express.json());
app.use("/students", studentsRouter);

// setup engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routes
app.get("/", (req, res) => {
  res.send("Welcome");
});

// error handler middleware
app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
});

// server listener
app.listen(3000, () => {
  console.log("Server is running at port 3k");
});
