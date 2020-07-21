const chai = require('chai');
const chaiHTTP = require('chai-http');
const assert = chai.assert;
const expect = require('expect');

const { addDummyUsers, removeDummyUsers } = require('../business/seed/seed');

const {
  addDummyProfileToBusiness,
  deleteDummyShopOfBusiness,
  profileId
} = require('../business/seed/seedProfile');

const {
  allProducts,
  searchQuery,
  addDummyProducts,
  removeDummyProducts,
  isScoreBoosted,
  fuzzyMatch1,
  fuzzyMatch2,
  matchSameBaseword,
  compare
} = require('./seed/seedSearch');

const bcrypt = require('bcryptjs');

//Configure chai
chai.use(chaiHTTP);

//const authControllerBusiness = require('../../controllers/business/authControllerBusiness');
const app = require('../../server');

describe('searchControllerShopper', () => {
  beforeEach(addDummyUsers);
  beforeEach(addDummyProfileToBusiness);
  beforeEach(addDummyProducts);
  afterEach(removeDummyProducts);
  afterEach(deleteDummyShopOfBusiness);
  afterEach(removeDummyUsers);

  describe('Should always return the same result', () => {
    let firstResult = null;
    it('First search should return product arr', done => {
      //return same result
      chai
        .request(app)
        .post('/search')
        .set('Content-Type', 'application/json')
        .send(searchQuery)
        .end(async function (error, res) {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200, 'status is not 200');
          firstResult = res.body;
          assert.isDefined(res.body[0]);
          done();
        });
    });

    it('Second search should return product arr and match first search product arr', done => {
      //return same result
      chai
        .request(app)
        .post('/search')
        .set('Content-Type', 'application/json')
        .send(searchQuery)
        .end(async function (error, res) {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200, 'status is not 200');
          expect(res => {
            expect(firstResult).to.have.deep.members(res.body);
          });
          done();
        });
    });
  });

  it('Should return products in order of most relevant to least relevant', done => {
    chai
      .request(app)
      .post('/search')
      .set('Content-Type', 'application/json')
      .send(searchQuery)
      .end(async function (error, res) {
        assert.equal(error, null, 'error is not null');
        assert.equal(res.status, 200, 'status is not 200');
        const sorted = res.body.sort(compare);
        expect(res => {
          expect(sorted).to.include.ordered.members(res.body);
        });
        done();
      });
  });

  it('Should boost score of product whose name matches search', done => {
    chai
      .request(app)
      .post('/search')
      .set('Content-Type', 'application/json')
      .send(searchQuery)
      .end(async function (error, res) {
        assert.equal(error, null, 'error is not null');
        assert.equal(res.status, 200, 'status is not 200');
        const result = isScoreBoosted(res.body);
        assert.equal(result, true, 'Score not boosted');
        done();
      });
  });

  it('Should return products 1 character out of place', done => {
    //return deletes, delete's, delate, selete
    chai
      .request(app)
      .post('/search')
      .set('Content-Type', 'application/json')
      .send(searchQuery)
      .end(async function (error, res) {
        assert.equal(error, null, 'error is not null');
        assert.equal(res.status, 200, 'status is not 200');
        const result = fuzzyMatch1(res.body);
        assert.equal(result, true, 'fuzzy match 1 char did not work');
        done();
      });
  });

  it('Should return products 2 characters out of place', done => {
    //return deletin, bulete
    chai
      .request(app)
      .post('/search')
      .set('Content-Type', 'application/json')
      .send(searchQuery)
      .end(async function (error, res) {
        assert.equal(error, null, 'error is not null');
        assert.equal(res.status, 200, 'status is not 200');
        const result = fuzzyMatch2(res.body);
        assert.equal(result, true, 'fuzzy match 2 chars did not work');
        done();
      });
  });

  it('Should return products with the same baseword', done => {
    //return deletion, deleteion
    chai
      .request(app)
      .post('/search')
      .set('Content-Type', 'application/json')
      .send(searchQuery)
      .end(async function (error, res) {
        assert.equal(error, null, 'error is not null');
        assert.equal(res.status, 200, 'status is not 200');
        const result = matchSameBaseword(res.body);
        assert.equal(result, true, 'same baseword match did not work');
        done();
      });
  });
});
