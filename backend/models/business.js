var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var BusinessSchema = new mongoose.Schema({
    username: String, //email
    fullName: String,
    password: String
})
BusinessSchema.plugin(passportLocalMongoose);
var Business = mongoose.model("Business", BusinessSchema);
module.exports = Business;