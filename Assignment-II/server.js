const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const ejs = require("ejs");
const UserRouter = require("./routes/users");

// connected to mongoDB
mongoose
  .connect("mongodb://localhost/UserDiary", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Connection error: ", err);
  });

// instantiate the express app
const app = express();

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes middleware
app.use("/usersdiary", UserRouter);

// setup the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
});

// error handler
app.use((err, req, res, next) => {
  res.status(500).send(err);
});

// listener
app.listen(4000, () => {
  console.log("Server is listening at port 4k");
});
