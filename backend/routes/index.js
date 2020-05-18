var express = require("express");
var app = express();
var router  = express.Router();
var passport = require("passport");
var Customer = require("../models/customer");
var Message = require("../models/message");
var http = require("http").createServer(app);

router.get("/", function(req, res) {
    res.render("customer/landing");
});

router.get("/register", function(req, res) {
    res.render("customer/register");
});

router.post("/register", function(req, res) {
    Customer.register(new Customer({username: req.body.username}), //register user
    req.body.password, function(error, user) {
        if(error) {
            console.log("something went wrong");
            console.log(error);
            return res.render("customer/register");
        } else { //if no error, log them in
            //local can be twitter!!
            passport.authenticate("local")(req, res, function() {
                res.redirect("/home"); 
            })
        }
    });
});

router.get("/login", function(req, res) {
    res.render("customer/login");
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login"
}), function(req, res) {

});

router.get('/messages', (req, res) => {
    Message.find({},(err, messages)=> {
      res.render("message/index");
    })
});

router.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) =>{
      if(err)
        sendStatus(500);
      io.emit('message', req.body);
      res.sendStatus(200);
      console.log("sent");
    })
  });

module.exports = router;
