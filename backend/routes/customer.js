var express = require("express");
var router  = express.Router();
var passport = require("passport");
var Customer = require("../models/customer");

router.get("/home", function(req, res) {
    res.render("customer/home");
});





module.exports = router;
