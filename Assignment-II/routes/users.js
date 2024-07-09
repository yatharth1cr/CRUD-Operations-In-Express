const express = require("express");
const router = express.Router();
const UserDiary = require("../models/UserDiary");

// Route to render a new user form
router.get("/new", (req, res) => {
  res.render("newUserForm");
});

// Route to handle list of users
router.get("/", (req, res, next) => {
  UserDiary.find({})
    .then((userdiary) => {
      res.render("users", { userdiary: userdiary });
    })
    .catch((err) => {
      return next(err);
    });
});

// Route to handle post request on /new
router.post("/new", (req, res, next) => {
  UserDiary.create(req.body)
    .then(() => {
      res.redirect("/usersdiary");
    })
    .catch((err) => {
      return next(err);
    });
});

// Route to handle render singleUser
router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  UserDiary.findById(id)
    .then((user) => {
      res.render("singleUser", { user });
    })
    .catch((err) => {
      return next(err);
    });
});

// Route to handle render editUserForm
router.get("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  UserDiary.findById(id)
    .then((user) => {
      res.render("editUserForm", { user: user });
    })
    .catch((err) => {
      return next(err);
    });
});

// Route to handle update the user
router.post("/:id", (req, res, next) => {
  var id = req.params.id;
  UserDiary.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.redirect("/usersdiary/" + id);
    })
    .catch((err) => {
      return next(err);
    });
});

//Route to handle delete a user
router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  UserDiary.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/usersdiary");
    })
    .catch((err) => {
      return next(err);
    });
});

// export the router
module.exports = router;
