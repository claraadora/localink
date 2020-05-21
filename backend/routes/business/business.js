var express = require("express");
var router = express.Router();
var passport = require("passport");
var Business = require("../../models/business/business");
var Shop = require("../../models/business/shop");
var methodOverride = require("method-override");
router.use(methodOverride("_method"));

router.get("/business/home", function (req, res) {
  Business.findById(req.user._id)
    .populate("shop")
    .exec(function (error, business) {
      if (error) {
        console.log("something went wrong " + error);
      } else {
        res.render("business/home", { business: business });
      }
    });
});

router.get("/business/:id/show-profile", function (req, res) {
  Business.findById(req.params.id)
    .populate("shop")
    .exec(function (error, business) {
      if (error) {
        console.log("something went wrong " + error);
      } else {
        res.render("business/settings/profile", { business: business });
      }
    });
});

router.get("/business/:id/edit-account-settings", function (req, res) {
  Business.findById(req.params.id)
    .populate("shop")
    .exec(function (error, business) {
      if (error) {
        console.log("something went wrong " + error);
      } else {
        res.render("business/settings/accountsettings", { business: business });
      }
    });
});

router.put("/business/:id/account-settings", function (req, res) {
  Business.findById(req.params.id, function (error, business) {
    if (error) {
      console.log("something went wrong " + error);
    } else {
      if (business.shop) {
        Shop.findByIdAndUpdate(business.shop, req.body.shop, function (
          error,
          shop
        ) {
          if (error) {
            console.log("something went wrong " + error);
          } else {
            business.username = req.body.username;
            business.shopName = req.body.shopName;
            business.setPassword(req.body.password, function (error) {
              if (error) {
                console.log("Password could not be saved. Please try again!");
              } else {
                business.save(function (error) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("saved password successfully");
                  }
                });
              }
              res.redirect("/business/" + req.params.id + "/show-profile");
            });
          }
        });
      } else {
        //first time editing account settings: CREATE
        var shop = new Shop(req.body.shop);
        shop.shopOwner = req.params.id;
        shop.save();
        business.shop = shop._id;
        business.setPassword(req.body.password, function (error) {
          if (error) {
            console.log("Password could not be saved. Please try again!");
          } else {
            business.save(function (error) {
              if (error) {
                console.log(error);
              } else {
                console.log("saved password successfully");
              }
            });
          }
          res.redirect("/business/" + req.params.id + "/show-profile");
        });
      }
    }
  });
});

//shop not set up
router.get("/business/:id/manage-products", function (req, res) {
  Business.findById(req.params.id, function (error, business) {
    if (error) {
      console.log(error);
    } else {
      res.render("business/settings/accountsettings", { business: business });
    }
  });
});

//shop not set up
router.get("/business/:id/new-product", function (req, res) {
  Business.findById(req.params.id, function (error, business) {
    if (error) {
      console.log(error);
    } else {
      res.render("business/settings/accountsettings", { business: business });
    }
  });
});

module.exports = router;
