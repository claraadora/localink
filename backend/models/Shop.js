const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business'
  },
  avatar: {
    type: String
  },
  description: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  distance: {
    type: Number
  },
  ratings: {
    type: Number
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

module.exports = Shop = mongoose.model('Shop', ShopSchema);