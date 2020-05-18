var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var CustomerSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})
CustomerSchema.plugin(passportLocalMongoose);
var Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;