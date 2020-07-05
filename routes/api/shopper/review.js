const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authShopper = require('../../../middleware/authShopper');

const reviewController = require('../../../controllers/shopper/reviewController');

// @route    POST /review
// @desc     Create a review
// @access   Private
// @user     Shopper -> middleware to check that user is not business
router.post(
  '/',
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
