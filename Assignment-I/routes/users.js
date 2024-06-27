const express = require("express");
const router = express.Router();
const User = require("../models/usersFormat");

// new user form
router.get("/new", (req, res) => {
  res.render("userForm");
});

// list users
router.get("/", (req, res) => {
  User.find({})
    .then((users) => {
      res.render("users", { users });
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
});

// get single user details
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.render("singleUser", { user });
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
});

// create new user
router.post("/new", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
  });
  newUser.save(res.redirect("/users"));
});

// delete user
router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send("User deleted successfully");
  });
});

// update user
router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
});

module.exports = router;
