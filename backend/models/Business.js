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
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Owner'
  // },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  }
});

module.exports = Business = mongoose.model('Business', BusinessSchema);
