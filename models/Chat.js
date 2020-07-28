const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  shopperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shopper',
    required: true
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  message: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }
  // isShopper: {
  //   type: String,
  //   required: true
  // }
});

module.exports = Chat = mongoose.model('Chat', ChatSchema);
