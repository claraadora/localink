const express = require('express');
const router = express();
const authBusiness = require('../../../middleware/authBusiness');
const checkObjectId = require('../../../middleware/CheckObjectId');

const Review = require('../../../models/Review');

// @route    POST business/review-reply/:review_id
// @desc     Post a reply to a review
// @access   Private
router.post(
  '/:review_id',
  [authBusiness, checkObjectId('review_id')],
  async (req, res) => {
    try {
      const review = await Review.findById(req.params.review_id);
      review.reply = req.body.reply;
      review.save();
      res.status(200).json('Sent review reply successfully');
    } catch (error) {
      console.log(error.message);
      res.status(500).json('Server error');
    }
  }
);

module.exports = router;
