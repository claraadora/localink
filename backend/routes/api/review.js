const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

const Shop = require('../../models/Shop');
const Shopper = require('../../models/Shopper');
const Product = require('../../models/Product');
const Review = require('../../models/Review');

// @route    POST /review
// @desc     Create a review
// @access   Private
// @user     Shopper
router.post(
  '/',
  [
    auth,
    [
      check('description', 'description is required').not().isEmpty(),
      check('rating', 'rating is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
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

      await shop.save();

      //   to send updated shop:
      //   shop = await shop.populate('reviews').execPopulate();
      //   res.json(shop);
      /////////

      res.json(newReview);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET /review/business/:business_id
// @desc     Get all reviews of a business
// @access   Private
// @user     Business
router.get('/business/:business_id', auth, async (req, res) => {
  try {
    const business = await Business.findById(req.params.business_id);
    const shop = await Shop.findById(business.shop).populate({
      path: 'reviews',
      model: 'Review'
    });
    res.json(shop);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
