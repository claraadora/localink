const mongoose = require('mongoose');

const Chat = new mongoose.Schema({
  chat: {
    shopper_id: {
      type: String,
      required: true
    },
    business_id: {
      type: String,
      required: true
    },
    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }
  }
});

module.exports = Chat = mongoose.model('Chat', ChatSchema);
