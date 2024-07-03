const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route to render a form for creating a new user
router.get("/new", (req, res) => {
  console.log(req.body);
  res.render("newUserForm");
});

// Route to render the user page (with an empty user object initially)
router.get("/", (req, res) => {
  res.render("user", { user: {} });
});

// Route to handle the creation of a new user
router.post("/", (req, res) => {
  console.log(req.body);
  User.create(req.body)
    .then((user) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.redirect("/users/new");
      console.log(err);
    });
});

// Route to display a list of users
router.get("/list", (req, res) => {
  User.find({})
    .then((users) => {
      res.render("users", { users });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});
module.exports = router;
