const express = require("express");
const app = express();
const router = express.Router();
const passport = require("passport");
const Business = require("../../models/business/business");
// var Message = require("../../models/message");
// var http = require("http").createServer(app);

router.get("/business", function (req, res) {
  res.render("business/landing");
});

router.get("/business/register", function (req, res) {
  res.render("business/register");
});

router.post("/business/register", function (req, res) {
  Business.register(
    new Business({ username: req.body.username, shopName: req.body.shopName }), //register user
    req.body.password,
    function (error, business) {
      if (error) {
        console.log("something went wrong");
        console.log(error);
        return res.render("business/register");
      } else {
        //if no error, log them in
        //specify the local strategy to authenticate requests, local can be twitter!!
        passport.authenticate("business-local")(req, res, function () {
          // session: true;
          res.redirect("/business/home");
        });
      }
    }
  );
});

router.get("/business/login", function (req, res) {
  res.render("business/login");
});

router.post(
  "/business/login",
  passport.authenticate("business-local", {
    successRedirect: "/business/home",
    failureRedirect: "/business/login",
  }),
  function (req, res) {}
);

module.exports = router;
