const Review = require('../../models/Review');

async function reviewReply(req, res) {
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

module.exports = { reviewReply };
