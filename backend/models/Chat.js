const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Chat = mongoose.model('Chat', ChatSchema);
