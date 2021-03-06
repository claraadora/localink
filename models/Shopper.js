const mongoose = require('mongoose');

const ShopperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  latLng: {
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
  },
  isAccountActive: {
    type: Boolean,
    default: false
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  transactionHistory: [
    //products
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

module.exports = Shopper = mongoose.model('Shopper', ShopperSchema);
