const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route to render a form for creating a new user
router.get("/new", (req, res) => {
  console.log(req.body);
  res.render("newUserForm");
});

// Route to display a list of users
router.get("/", (req, res, next) => {
  User.find({})
    .then((users) => {
      res.render("users", { users: users });
    })
    .catch((err) => {
      return next(err);
    });
});

// Route to display a singleUsers
router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  User.findById(id)
    .then((user) => {
      res.render("singleUser", { user: user });
    })
    .catch((err) => {
      return next(err);
    });
});

// Route to handle the creation of a new user
router.post("/", (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      res.redirect("/users");
    })
    .catch((err) => {
      return next(err);
    });
});

// Route to handle update user
router.get("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  User.findById(id)
    .then((user) => {
      res.render("editUserForm", { user });
    })
    .catch((err) => {
      return next(err);
    });
});

// Route to handle formupdated data
router.put("/:id");

module.exports = router;
