const express = require('express');
const router = express();
const authBusiness = require('../../../middleware/authBusiness');
const checkObjectId = require('../../../middleware/CheckObjectId');

const reviewReplyController = require('../../../controllers/business/reviewReplyController');

// @route    POST business/review-reply/:review_id
// @desc     Post a reply to a review
// @access   Private
router.post(
  '/:review_id',
  [authBusiness, checkObjectId('review_id')],
  reviewReplyController.reviewReply
);

module.exports = router;
