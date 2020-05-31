const mongoose = require('mongoose');

const ChatlistSchema = new mongoose.Schema({
  inbox: [
    //array of chat, each with different people
    {
      chat: {
        shopper_id: {
          type: String,
          required: true
        },
        business_id: {
          type: String,
          required: true
        },
        messages: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
          }
        ]
      }
    }
  ]
});

module.exports = Chatlist = mongoose.model('Chatlist', ChatlistSchema);
