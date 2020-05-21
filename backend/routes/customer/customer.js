const express = require("express");
const router = express.Router();
const passport = require("passport");
//var Customer = require("../models/customer");

router.get("/home", function (req, res) {
  res.render("customer/home");
});

module.exports = router;
