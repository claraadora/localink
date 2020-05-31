const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shopper'
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  rating: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  reply: {
    type: String
  }
});

module.exports = Review = mongoose.model('Review', ReviewSchema);
