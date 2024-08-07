const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route to render a form for creating a new user
router.get("/new", (req, res) => {
  console.log(req.body);
  res.render("newUserForm");
});

// Route to render the user page
// router.get("/", (req, res) => {
//   res.render("users");
// });

// Route to display a list of users
router.get("/", (req, res, next) => {
  User.find({})
    .then((users) => {
      res.render("users", { users: users });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

router.get("/:id", (req, res) => {
  var id = req.params.id;
  User.findById(id)
    .then((user) => {
      res.render("singleUser", { user: user });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

// Route to handle the creation of a new user
router.post("/", (req, res) => {
  //   console.log(req.body);
  User.create(req.body)
    .then((user) => {
      res.redirect("/users");
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

module.exports = router;
