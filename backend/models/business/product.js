var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var ProductSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    },
    name: String,
    image: String, 
    description: String,
    price: Number,
})
ProductSchena.plugin(passportLocalMongoose);
var Product = mongoose.model("Product", ProductSchema);
module.exports = Product;