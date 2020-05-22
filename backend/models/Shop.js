const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business'
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  shopDescription: {
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
      ref: 'product'
    }
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'review'
    }
  ]
});

module.exports = Shop = mongoose.model('Shop', ShopSchema);
