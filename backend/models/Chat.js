const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  shopper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shopper',
    required: true
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  message: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  isShopper: {
    type: Boolean,
    required: true
  }
});

module.exports = Chat = mongoose.model('Chat', ChatSchema);
