var express = require("express");
var router  = express.Router();
var passport = require("passport");
var Business = require("../../models/business/business");
var Shop = require("../../models/business/shop");
var methodOverride = require("method-override");
router.use(methodOverride("_method"));

router.get("/business/home", function(req, res) {
    Business.findById(req.user._id).populate("shop").exec(function(error, business) {
        if (error) {
            console.log("something went wrong " + error);
        } else {
            res.render("business/home", {business: business});
        } 
    })
});

router.get("/business/:id/ShowProfile", function(req, res) {
    Business.findById(req.params.id).populate("shop").exec(function(error, business) {
        if (error) {
            console.log("something went wrong " + error);
        } else {
            res.render("business/settings/profile", {business: business});
        } 
    })
});

router.get("/business/:id/EditAccountSettings", function(req, res) {
    Business.findById(req.params.id).populate("shop").exec(function(error, business) {
        if (error) {
            console.log("something went wrong " + error);
        } else {
            res.render("business/settings/accountsettings", {business: business});
        } 
    });
});

router.put("/business/:id/AccountSettings", function(req, res) {
    Business.findById(req.params.id, function (error, business) {
        if (error) {
            console.log("something went wrong " + error);
        } else {
            if (business.shop) {
                Shop.findByIdAndUpdate(business.shop, req.body.shop, function(error, shop) {
                    if(error) {
                        console.log("something went wrong " + error);
                    } else {
                        business.username = req.body.username;
                        business.shopName = req.body.shopName;
                        business.setPassword(req.body.password, function(error) {
                            if (error) {
                                console.log("Password could not be saved. Please try again!")
                            } else {
                                business.save();
                                console.log("saved password successfully");
                            }
                        });
                        res.redirect("/business/" + req.params.id + "/ShowProfile")
                    }
                });
            } else { //first time editing account settings: CREATE
                var shop = new Shop(req.body.shop);
                shop.shopOwner = req.params.id;
                shop.save();
                business.shop = shop._id;
                business.setPassword(req.body.password, function(error) {
                    if (error) {
                        console.log("Password could not be saved. Please try again!")
                    } else {
                        business.save();
                        console.log("saved password successfully");
                    }
                });
                res.redirect("/business/" + req.params.id + "/ShowProfile");
            }
        }
    })
});

router.post("/business/:id/profile", function(req, res) {
    Business.findByIdAndUpdate(req.params.id, function(error, business) {
        if (error) {
            console.log("something went wrong " + error);
        } else {
            res.redirect("/business/" + business._id + "")
        }
    })
})

router.get("/business/:id/new", function(req, res) {
    Business.findById(req.params.id, function(error, business) {
        if(error) {
            console.log("something went wrong " + error);
        } else {
            res.render("business/settings/new", {business: business});
        }
    });
});











module.exports = router;