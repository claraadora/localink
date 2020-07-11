const mongoose = require('mongoose');
const Review = require('../../../models/Review');

const {
  dummyProductForReview,
  addDummyProduct,
  removeDummyProduct
} = require('../../business/seed/seedProduct');

const dummyReview = {
  product_id: mongoose.Types.ObjectId(dummyProductForReview._id),
  image: 'some image url',
  description: 'test description',
  rating: 4.1
};

const compareToDummyReview = {
  image: 'some image url',
  description: 'test description',
  rating: 4.1
};

async function deleteAddedReview() {
  await Review.findOneAndDelete({ description: dummyReview.description });
}

module.exports = {
  dummyReview,
  compareToDummyReview,
  deleteAddedReview
};
