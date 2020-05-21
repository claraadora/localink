var express = require("express");
var router = express.Router();
var passport = require("passport");
var Business = require("../../models/business/business");
var Shop = require("../../models/business/shop");
var Product = require("../../models/business/product");
var methodOverride = require("method-override");
router.use(methodOverride("_method"));

//edit button for each product in product overview/manage products
router.get(
  "/business/:id/shop/:shop_id/product/:product_id/edit-product",
  function (req, res) {
    //Product.findById(req.params.product_id).populate("shop").exec(function(error, product) {
    Shop.findById(req.params.shop_id, function (error, shop) {
      if (error) {
        console.log(error);
      } else {
        console.log("shop: " + shop);
        Product.findById(req.params.product_id, function (error, product) {
          if (error) {
            console.log(error);
          } else {
            res.render("business/settings/edit", {
              business_id: req.params.id,
              product: product,
              shop: shop,
            });
          }
        });
      }
    });
  }
);

router.post("/business/:id/shop/:shop_id/product/:product_id", function (
  req,
  res
) {
  Product.findByIdAndUpdate(req.params.product_id, req.body.product, function (
    error,
    product
  ) {
    if (error) {
      console.log(error);
    } else {
      res.redirect(
        "/business/" +
          req.params.id +
          "/shop/" +
          req.params.shop_id +
          "/manage-products"
      );
    }
  });
});

router.delete("/business/:id/shop/:shop_id/product/:product_id", function (
  req,
  res
) {
  console.log("req.params: " + req.params);
  console.log(req.params.product_id);
  Product.findByIdAndRemove(req.params.product_id, function (error, product) {
    if (error) {
      console.log(error);
    } else {
      res.redirect(
        "/business/" +
          req.params.id +
          "/shop/" +
          req.params.shop_id +
          "/manage-products"
      );
    }
  });
});

module.exports = router;
