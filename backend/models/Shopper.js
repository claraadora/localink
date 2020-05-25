const mongoose = require('mongoose');

const ShopperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

module.exports = Shopper = mongoose.model('Shopper', ShopperSchema);
