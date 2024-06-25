const express = require("express");
const router = express.Router();

// routes
router.get("/new", (req, res) => {
  res.render("new-Student");
});

router.post("/", (req, res) => {
  res.send("Student created");
});

router.get("/", (req, res) => {
  const studentList = ["ankit", "suraj", "prashant", "ravi"];
  res.render("students", {
    list: studentList,
  });
});

router.get("/:id", (req, res) => {
  res.render("studentDetail", {
    student: { name: "rahul", email: "rahul@altcampus.io" },
  });
});

module.exports = router;
