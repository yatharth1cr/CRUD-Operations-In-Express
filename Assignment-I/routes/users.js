const express = require("express");
const router = express.Router();
const User = require("../models/usersFormat");
// routes-----------

// list users
router.get("/", (req, res) => {
  res.render("users");
});

// get single user details
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const users = users.find((u) => u.id === id);
  res.render("singleuser", { id });
});

// new user form
router.get("/new", (req, res) => {
  res.render("userForm");
});

// delete user
router.delete("/:id", (req, res) => {
  res.send("deleted the user");
});

// update user
router.put("/:id", (req, res) => {});

module.exports = router;
