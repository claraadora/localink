const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shopper',
    required: true
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  reply: {
    type: String
  }
});

module.exports = Review = mongoose.model('Review', ReviewSchema);
