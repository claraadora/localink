var express = require("express");
var router  = express.Router();
var passport = require("passport");
//var Business = require("../models/business");

router.get("/business/home", function(req, res) {
    res.render("business/home")
});








module.exports = router;