var express = require("express");
var router  = express.Router();
var passport = require("passport");
var Business = require("../../models/business/business");
var Shop = require("../../models/business/shop");
var Product = require("../../models/business/product");
var methodOverride = require("method-override");
router.use(methodOverride("_method"));

router.get("/business/:id/shop/:shop_id/new-product", function(req, res) {
    Business.findById(req.params.id, function(error, business) {
        if (error) {
            console.log(error);
        } else {
            res.render("business/settings/new", {business: business, shop_id: req.params.shop_id});
        }
    });
});

router.post("/business/:id/shop/:shop_id", function(req, res) {
    Shop.findById(req.params.shop_id, function(error, shop) {
        if (error) {
            console.log(error);
        } else {
            console.log(req.body.product);
            Product.create(req.body.product, function(error, product) {
                console.log(product);
                if(error) {
                    console.log(error);
                } else {
                    product.shop = req.params.id;
                    //product.save();
                    shop.products.push(product);
                    shop.save();
                    console.log(shop);
                    res.redirect("/business/" + req.params.id + "/shop/" + req.params.shop_id + "/manage-products")
                }
            });
        }
    });
});

//show
router.get("/business/:id/shop/:shop_id/manage-products", function(req, res) {
    Shop.findById(req.params.shop_id).populate("products").exec(function(error, shop) {
        if (error) {
            console.log(error);
        } else {
            res.render("business/settings/manageproducts", {shop: shop});
        }
    });
});

module.exports = router;