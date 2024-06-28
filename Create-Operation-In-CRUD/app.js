// requires
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const ejs = require("ejs");
const path = require("path");

// connected to mongoDB
mongoose
  .connect("mongodb://localhost/User", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

// instantiate the express app
const app = express();

// middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "public"));

// routes middleware
app.use("/", userRouter);

// setup engine
app.set("view engine", "ejs");
app.set();

// routes
app.get("/", (req, res) => {
  console.log("Welcome");
});

// 404 handler
app.use((req, res, next) => {
  res.send("Page Not Found!");
});

// error handler middleware
app.use((err, req, res, next) => {
  res.send(err);
});

// server listener
app.listen(3000, () => {
  console.log("Server is listening at port 3k");
});
