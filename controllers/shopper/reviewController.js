const { validationResult } = require('express-validator');

const Shop = require('../../models/Shop');
const Shopper = require('../../models/Shopper');
const Product = require('../../models/Product');
const Review = require('../../models/Review');

const multer = require('multer');
const path = require('path');

async function uploadReviewImage(req, res) {
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage }).single('file');

  upload(req, res, async err => {
    if (err) {
      return res.json({ success: false, err });
    }
    const image = {
      contentType: path.extname(req.file.originalname),
      data: req.file.buffer
    };
    const url = `data:image/${image.contentType};base64,${image.data.toString(
      'base64'
    )}`;

    return res.json({ success: true, url });
  });
}

async function createReview(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const shopper = await Shopper.findByID(req.user._id);
    let shop = await Shop.findById(req.params.shop_id);
    const newReview = new Review({
      author: shopper,
      shop: shop,
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

module.exports = { createReview, getBusinessReviews, uploadReviewImage };
