const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  users: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    validate: v => Array.isArray(v) && v.length > 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  shopName: {
    type: String,
    required: true
  }
});

module.exports = Business = mongoose.model('Business', BusinessSchema);
