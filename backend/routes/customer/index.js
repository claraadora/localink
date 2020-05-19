var express = require("express");
var app = express();
var router  = express.Router();
var passport = require("passport");
var Customer = require("../../models/customer");
// var Message = require("../../models/message");
// var http = require("http").createServer(app);

router.get("/", function(req, res) {
    res.render("customer/landing");
});

router.get("/register", function(req, res) {
    res.render("customer/register");
});

router.post("/register", function(req, res) {
    Customer.register(new Customer({username: req.body.username, 
                                    fullName: req.body.fullName}), //register user
    req.body.password, function(error, user) {
        if(error) {
            console.log("something went wrong");
            console.log(error);
            return res.render("customer/register");
        } else { //if no error, log them in
            //local can be twitter!!
            passport.authenticate("customer-local")(req, res, function() {
                res.redirect("/home"); 
            })
        }
    });
});

router.get("/login", function(req, res) {
    res.render("customer/login");
})

router.post("/login", passport.authenticate("customer-local", {
    successRedirect: "/home",
    failureRedirect: "/login"
}), function(req, res) {

});

module.exports = router;
