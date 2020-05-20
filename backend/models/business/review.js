var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var ReviewSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    reviewDescription: String, 
    image: String,
    rating: Number,
})
StoreSchema.plugin(passportLocalMongoose);
var Store = mongoose.model("Store", StoreSchema);
module.exports = Store;