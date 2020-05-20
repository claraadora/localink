var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var BusinessSchema = new mongoose.Schema({
    username: String, //email
    shopName: String,
    password: String,
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    },
})
BusinessSchema.plugin(passportLocalMongoose);
var Business = mongoose.model("Business", BusinessSchema);
module.exports = Business;