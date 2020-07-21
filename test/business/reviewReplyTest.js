const chai = require('chai');
const chaiHTTP = require('chai-http');
const assert = chai.assert;

const {
  firstUserOwnerToken,
  addDummyUsers,
  removeDummyUsers
} = require('./seed/seed');

const {
  dummyProfile,
  updatedDummyProfile,
  profileId,
  addDummyProfileToBusiness,
  deleteDummyShopOfBusiness
} = require('./seed/seedProfile');

const {
  dummyProduct,
  updatedDummyProduct,
  addDummyProduct,
  removeDummyProduct,
  removeAddedDummyProduct
} = require('./seed/seedProduct');

const { addDummyShopper, removeDummyShopper } = require('../shopper/seed/seed');

const {
  addDummyReview,
  removeDummyReview,
  reviewReply,
  reviewId
} = require('../shopper/seed/seedReview');

//Configure chai
chai.use(chaiHTTP);

const app = require('../../server');
const { expect } = require('chai');

describe('reviewReplyController', () => {
  beforeEach(addDummyShopper);
  afterEach(removeDummyShopper);

  beforeEach(addDummyUsers);
  beforeEach(addDummyProfileToBusiness);
  beforeEach(() => addDummyProduct(dummyProduct));
  beforeEach(addDummyReview);
  afterEach(() => removeDummyProduct(dummyProduct));
  afterEach(removeDummyReview);
  afterEach(deleteDummyShopOfBusiness);
  afterEach(removeDummyUsers);

  it('Should save added review reply by shop', done => {
    chai
      .request(app)
      .post(`/business/review-reply/${reviewId}`)
      .set('x-auth-token', firstUserOwnerToken)
      .send(reviewReply)
      .end(async (error, res) => {
        const review = Review.findOne({ reply: reviewReply.reply });
        expect(review).to.exist;
        const shop = await Shop.findById(profileId);
        const reviewId = shop.reviews[0];
        const returnedReply = (await Review.findById(reviewId)).reply;
        assert.equal(
          returnedReply,
          reviewReply.reply,
          'review reply in shop is different'
        );
        done();
      });
  });
});
