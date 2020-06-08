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
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  inbox: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chatlist'
  },
  transactionHistory: [
    //products
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

module.exports = Shopper = mongoose.model('Shopper', ShopperSchema);
