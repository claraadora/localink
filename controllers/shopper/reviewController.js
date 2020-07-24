const { validationResult } = require('express-validator');

const Shop = require('../../models/Shop');
const Shopper = require('../../models/Shopper');
const Product = require('../../models/Product');
const Review = require('../../models/Review');

async function createReview(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const shopper = await Shopper.findById(req.user.id);
    const product = await Product.findById(req.body.product_id);
    let shop = await Shop.findById(product.shop);
    const newReview = new Review({
      author: shopper.id,
      shop: product.shop,
      product: product,
      image: req.body.image,
      description: req.body.description,
      rating: req.body.rating
    });

    await newReview.save();

    shop.reviews.unshift(newReview);

    const numOfReviews = shop.reviews.length;
    const currentShopRating = shop.ratings ? shop.ratings : 0;
    const newRating = (currentShopRating + newReview.rating) / numOfReviews;
    shop.ratings = newRating;

    await shop.save();

    shop = await shop.populate('reviews').execPopulate();
    res.json(shop);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
}

async function getBusinessReviews(req, res) {
  try {
    const shop = await Shop.findOne({
      owner: req.params.business_id
    }).populate({
      path: 'reviews',
      model: 'Review'
    });
    res.json(shop.reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
}

module.exports = { createReview, getBusinessReviews };
