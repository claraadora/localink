const chai = require('chai');
const chaiHTTP = require('chai-http');
var expect = chai.expect;

//Configure chai
chai.use(chaiHTTP);

const { dummyShopper } = require('../../shopper/seed/seed');
const { dummyProfile } = require('../seed/seedProfile');
const { dummyProduct } = require('../seed/seedProduct');
const Review = require('../../../models/Review');

describe('test review model', () => {
  it('review object should be invalid if author is empty', done => {
    const reviewFields = {
      shop: dummyProfile._id,
      product: dummyProduct._id,
      description: 'the review description',
      rating: 4.5
    };
    const review = new Review(reviewFields);
    review.validate(error => {
      expect(error.errors.author).to.exist;
      done();
    });
  });

  it('review object should be invalid if author is in wrong type', done => {
    const reviewFields = {
      author: 'test',
      shop: dummyProfile._id,
      product: dummyProduct._id,
      description: 'the review description',
      rating: 4.5
    };
    const review = new Review(reviewFields);
    review.validate(error => {
      expect(error.errors.author).to.exist;
      done();
    });
  });

  it('review object should be invalid if shop is empty', done => {
    const reviewFields = {
      author: dummyShopper._id,
      product: dummyProduct._id,
      description: 'the review description',
      rating: 4.5
    };
    const review = new Review(reviewFields);
    review.validate(error => {
      expect(error.errors.shop).to.exist;
      done();
    });
  });

  it('review object should be invalid if shop is in wrong type', done => {
    const reviewFields = {
      author: dummyShopper._id,
      shop: dummyProfile.shopName,
      product: dummyProduct._id,
      description: 'the review description',
      rating: 4.5
    };
    const review = new Review(reviewFields);
    review.validate(error => {
      expect(error.errors.shop).to.exist;
      done();
    });
  });

  it('review object should be invalid if product is empty', done => {
    const reviewFields = {
      author: dummyShopper._id,
      shop: dummyProfile._id,
      description: 'the review description',
      rating: 4.5
    };
    const review = new Review(reviewFields);
    review.validate(error => {
      expect(error.errors.product).to.exist;
      done();
    });
  });

  it('review object should be invalid if product is in wrong type', done => {
    const reviewFields = {
      author: dummyShopper._id,
      shop: dummyProfile._id,
      product: dummyProduct.name,
      description: 'the review description',
      rating: 4.5
    };
    const review = new Review(reviewFields);
    review.validate(error => {
      expect(error.errors.product).to.exist;
      done();
    });
  });

  it('review object should be invalid if description is empty', done => {
    const reviewFields = {
      author: dummyShopper._id,
      shop: dummyProfile._id,
      product: dummyProduct._id,
      rating: 4.5
    };
    const review = new Review(reviewFields);
    review.validate(error => {
      expect(error.errors.description).to.exist;
      done();
    });
  });

  it('review object should be invalid if rating is empty', done => {
    const reviewFields = {
      author: dummyShopper._id,
      shop: dummyProfile._id,
      product: dummyProduct._id,
      description: 'the review description'
    };
    const review = new Review(reviewFields);
    review.validate(error => {
      expect(error.errors.rating).to.exist;
      done();
    });
  });
});
