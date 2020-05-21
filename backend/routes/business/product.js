var express = require("express");
var router  = express.Router();
var passport = require("passport");
var Business = require("../../models/business/business");
var Shop = require("../../models/business/shop");
var Product = require("../../models/business/product");
var methodOverride = require("method-override");
router.use(methodOverride("_method"));

//edit button for each product in product overview/manage products
router.get("/business/:id/shop/:shop_id/product/:product_id/edit-product", function(req, res) {
    Product.findbyId(req.params.product_id).populate("shop").exec(function(error, product) {
        if(error) {
            console.log(error);
        } else {
            res.render("/business/settings/edit", {product: product, shop_name: product.shop.shopName});
        } 
    });
});

router.post("/business/:id/shop/:shop_id/product/:product_id", function(req, res) {
    Product.findByIdAndUpdate(req.params.product_id, req.body.product).populate("shop").exec(function(error, product) {
        if(error) {
            console.log(error);
        } else {
            res.render("business/settings/manageproducts")
        }
    });
});

module.exports = router;