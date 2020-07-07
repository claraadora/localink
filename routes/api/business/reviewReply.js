const express = require('express');
const router = express();
const authBusiness = require('../../../middleware/business/authBusiness');
const checkObjectId = require('../../../middleware/CheckObjectId');

const reviewReplyControllerBusiness = require('../../../controllers/business/reviewReplyControllerBusiness');

// @route    POST business/review-reply/:review_id
// @desc     Post a reply to a review
// @access   Private
router.post(
  '/:review_id',
  [authBusiness, checkObjectId('review_id')],
  reviewReplyControllerBusiness.reviewReply
);

module.exports = router;
