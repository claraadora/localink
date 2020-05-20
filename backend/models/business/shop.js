var mongoose = require("mongoose");
//var passportLocalMongoose = require("passport-local-mongoose");

var ShopSchema = new mongoose.Schema({
    shopOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business"
    },
    shopName: String, 
    shopAvatar: String,
    shopDescription: String,
    address: String,
    distance: Number,
    ratings: Number, //average of all the ratings of each review
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
         }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
         }
    ]
})
//ShopSchema.plugin(passportLocalMongoose);
var Shop = mongoose.model("Shop", ShopSchema);
module.exports = Shop;