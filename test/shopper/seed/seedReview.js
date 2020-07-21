const { ObjectID } = require('mongodb');

const mongoose = require('mongoose');
const Review = require('../../../models/Review');

const { dummyShopper } = require('./seed');

const { profileId } = require('../../business/seed/seedProfile');

const { dummyProductForReview } = require('../../business/seed/seedProduct');

const reviewId = new ObjectID();

const dummyReview = {
  _id: reviewId,
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

const reviewReply = {
  reply: 'test reply: thank you for you review'
};

async function deleteAddedReview() {
  await Review.findOneAndDelete({ description: dummyReview.description });
}

async function addDummyReview() {
  const shopper = await Shopper.findById(dummyShopper._id);
  const product = await Product.findById(dummyReview.product_id);
  const shop = await Shop.findById(product.shop);

  const newReview = new Review({
    _id: reviewId,
    author: shopper.id,
    shop: product.shop,
    product: product,
    ...compareToDummyReview
  });

  await newReview.save();

  shop.reviews.unshift(newReview);

  const numOfReviews = shop.reviews.length;
  const currentShopRating = shop.ratings ? shop.ratings : 0;
  const newRating = (currentShopRating + newReview.rating) / numOfReviews;
  shop.ratings = newRating;

  await shop.save();
}

async function removeDummyReview() {
  await Review.findOneAndDelete({ author: dummyShopper._id });
  const product = await Product.findById(dummyReview.product_id);
  const shop = await Shop.findById(profileId);
  shop.reviews.shift();
  await shop.save();
}

module.exports = {
  dummyReview,
  compareToDummyReview,
  reviewReply,
  reviewId,
  deleteAddedReview,
  addDummyReview,
  removeDummyReview
};
