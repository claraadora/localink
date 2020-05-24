const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  }
});

ProductSchema.index({ name: 'text', description: 'text' });

module.exports = Product = mongoose.model('Product', ProductSchema);
