// var mongoose = require("mongoose");

// var MessageSchema = new mongoose.Schema({
//     name: String,
//     message: String
// });

// var Message = mongoose.model("Message", MessageSchema);
// module.exports = Message;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    message: {
      type: String
    },
    sender: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

let Chat = mongoose.model("theChat", chatSchema);

module.exports = Chat;