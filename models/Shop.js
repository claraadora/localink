const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  shopName: {
    type: String,
    required: true
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
    type: {
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    },
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
