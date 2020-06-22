const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  chat: {
    shopper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shopper',
      required: true
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
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
  }
});

module.exports = Chat = mongoose.model('Chat', ChatSchema);
