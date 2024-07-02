const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/new", (req, res) => {
  console.log(req.body);
  res.render("newUserForm");
});

router.get("/", (req, res) => {
  res.render("user", { user: {} });
});

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

module.exports = router;
