const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");

// require the users router
let usersRouter = require("./routes/users");

// connected to mongoDB
mongoose
  .connect("mongodb://localhost/UserDiary", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

// instantiate the app
const app = express();

// middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", usersRouter);

// setup engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routes
app.get("/", (req, res) => {
  res.send("Welcome");
});

// error handler middleware.
app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
});

// Server listener
app.listen(4000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is running at port 4000");
  }
});
