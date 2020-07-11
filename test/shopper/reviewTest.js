const chai = require('chai');
const chaiHTTP = require('chai-http');
const assert = chai.assert;
const expect = require('expect');
const {
  dummyShopper,
  shopperToken,
  registerCredentials,
  newEmail,
  newPassword,
  addDummyShopper,
  removeDummyShopper,
  removeAddedDummyShopper,
  registerShopper,
  compareToken,
  getShopperFromToken
} = require('./seed/seed');

const {
  dummyReview,
  compareToDummyReview,
  deleteAddedReview
} = require('./seed/seedReview');

const { addDummyUsers, removeDummyUsers } = require('../business/seed/seed');

const {
  addDummyProfileToBusiness,
  deleteDummyShopOfBusiness,
  profileId
} = require('../business/seed/seedProfile');

const {
  dummyProductForReview,
  addDummyProduct,
  removeDummyProduct
} = require('../business/seed/seedProduct');

const bcrypt = require('bcryptjs');

//Configure chai
chai.use(chaiHTTP);

//const authControllerBusiness = require('../../controllers/business/authControllerBusiness');
const app = require('../../server');

describe('reviewControllerShopper', () => {
  beforeEach(addDummyShopper);
  afterEach(removeDummyShopper);

  beforeEach(addDummyUsers);
  beforeEach(addDummyProfileToBusiness);
  beforeEach(() => addDummyProduct(dummyProductForReview));
  afterEach(() => removeDummyProduct(dummyProductForReview));
  afterEach(deleteDummyShopOfBusiness);
  afterEach(removeDummyUsers);
  after(deleteAddedReview);

  it('Should return updated shop with new review created by shopper', done => {
    chai
      .request(app)
      .post('/review')
      .set('x-auth-token', shopperToken)
      .send(dummyReview)
      .end(function (error, res) {
        assert.equal(error, null, 'error is not null');
        assert.equal(res.status, 200, 'status is not 200');
        const review = res.body.reviews[0];
        expect(res => {
          expect(review).to.include(compareToDummyReview);
        });
        assert.equal(
          review.author,
          dummyShopper._id,
          'author of review not the same'
        );
        assert.equal(review.shop, profileId, 'shop of review not the same');
        assert.equal(
          review.product,
          dummyReview.product_id,
          'product of review not the same'
        );
        done();
      });
  });
});
