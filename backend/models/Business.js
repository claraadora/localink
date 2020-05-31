const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  shopName: {
    type: String,
    required: true
  },
  inbox: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chatlist'
  }
});

module.exports = Business = mongoose.model('Business', BusinessSchema);
