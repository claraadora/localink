const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business'
  },
  shopName: {
    type: String
  },
  avatar: {
    type: String
  },
  description: {
    type: String
  },
  promotions: {
    type: String
  },
  openingHours: {
    type: String
  },
  contactDetails: {
    type: String
  },
  delivery: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  latLng: {
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
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
