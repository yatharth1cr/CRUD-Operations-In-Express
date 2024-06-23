const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");

// instantiate the app
const app = express();

// connect mongoose
mongoose
  .connect("mongodb://localhost/School", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected true");
  })
  .catch((err) => {
    console.log(err);
  });

// middlleware
app.use(logger("dev"));
app.use(express.json());

app.use((req, res, next) => {
  res.locals.message = "Hello local message";
  next();
});

// setup view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routes
app.get("/", (req, res) => {
  //-----------
  res.render("school", { name: "Yatharth", age: 20 });

  //-----------
  let school = { name: "name1", email: "email1@gmail.com", place: "place1" };
  res.render("school", { person: school });

  //-----------
  let school1 = ["name", "email", "class", "place"];
  res.render("school", { school: school1 });
});

app.get("/about", (req, res) => {
  res.render("about");
});

// error handler
app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
});

// Server listener
app.listen(4444, () => {
  console.log("Server is running at port 4444");
});
