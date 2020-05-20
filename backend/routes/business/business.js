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
    console.log("id: " + req.params.id);
    Business.findById(req.params.id).populate("shop").exec(function(error, business) {
        if (error) {
            console.log("something went wrong " + error);
        } else {
            console.log(business);
            console.log("business.shop -> check undefined: " + business.shop)
            res.render("business/settings/profile", {business: business});
        } 
    })
});

router.get("/business/:id/EditAccountSettings", function(req, res) {
    console.log("in edit req.params: " + req.params + " and the id: " +req.params.id );
    Business.findById(req.params.id).populate("shop").exec(function(error, business) {
        console.log("in edit business " + business);
        if (error) {
            console.log("something went wrong " + error);
        } else {
            res.render("business/settings/accountsettings", {business: business});
        } 
    });
});

router.put("/business/:id/AccountSettings", function(req, res) {
    console.log("in acc settings: " + req.params.id);
    Business.findById(req.params.id, function (error, business) {
        console.log("req.params " + req.params);
        console.log("business " + business)
        if (error) {
            console.log("1st) something went wrong " + error);
        } else {
            if (business.shop) {
                Shop.findByIdAndUpdate(business.shop, req.body.shop, function(error, shop) {
                    console.log("req.body: " + req.body);
                    console.log("req.body.shop: " + req.body.shop);
                    console.log("business shop " + business.shop);
                    console.log("shop is " + shop)
                    if(error) {
                        console.log("2nd) something went wrong " + error);
                    } else {
                        business.username = req.body.username;
                        business.shopName = req.body.shopName;
                        business.password = req.body.password;
                        // business.save();
                        res.redirect("/business/" + req.params.id + "/ShowProfile")
                    }
                });
            } else { //first time editing account settings: CREATE
                var shop = new Shop(req.body.shop);
                shop.shopOwner = req.params.id;
                shop.save();
                console.log("shop: " + shop);
                business.shop = shop._id;
                business.save();
                console.log("business: " + business);
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