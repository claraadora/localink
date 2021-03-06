const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authShopper = require('../../../middleware/shopper/authShopper');

const reviewController = require('../../../controllers/shopper/reviewController');

// @route    POST /review/upload-image/:shop_id
// @desc     Upload review image
// @access   Private
router.post('/upload-image/:shop_id', reviewController.uploadReviewImage);

// @route    POST /review
// @desc     Create a review
// @access   Private
// @user     Shopper -> middleware to check that user is not business
router.post(
  '/:shop_id',
  [
    authShopper,
    [
      check('description', 'description is required').not().isEmpty(),
      check('rating', 'rating is required').not().isEmpty()
    ]
  ],
  reviewController.createReview
);

// @route    GET /review/business
// @desc     Get all reviews of a business
// @access   Private
// @return   Array of reviews
// @user     Business
router.get(
  '/business/:business_id',
  authShopper,
  reviewController.getBusinessReviews
);

module.exports = router;
