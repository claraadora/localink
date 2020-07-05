const chai = require('chai');
const chaiHTTP = require('chai-http');
const assert = chai.assert;
const {
  business,
  firstUserOwner,
  userOwner,
  userStaff,
  firstUserOwnerToken,
  userOwnerToken,
  userStaffToken,
  addDummyUsers,
  removeDummyUsers,
  compareToken
} = require('./seed/seed');

//Configure chai
chai.use(chaiHTTP);

//const authControllerBusiness = require('../../controllers/business/authControllerBusiness');
const app = require('../../server');

describe('autheControllerBusiness', () => {
  //Test to get user by token
  beforeEach(addDummyUsers);
  afterEach(removeDummyUsers);
  describe('Get business from token', () => {
    it('Given first owner token should return business object', done => {
      chai
        .request(app)
        .get('/business/auth')
        .set('x-auth-token', firstUserOwnerToken)
        .end(function (error, res) {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200), 'status is not 200';
          assert.equal(
            res.body._id,
            business._id,
            'return business object incorrect'
          );
          done();
        });
    });

    it('Given added owner token should return business object', done => {
      chai
        .request(app)
        .get('/business/auth')
        .set('x-auth-token', userOwnerToken)
        .end(function (error, res) {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200), 'status is not 200';
          assert.equal(
            res.body._id,
            business._id,
            'return business object incorrect'
          );
          done();
        });
    });

    it('Given added staff token should return business object', done => {
      chai
        .request(app)
        .get('/business/auth')
        .set('x-auth-token', userStaffToken)
        .end(function (error, res) {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200), 'status is not 200';
          assert.equal(
            res.body._id,
            business._id,
            'return business object incorrect'
          );
          done();
        });
    });
  });

  //Test to login
  describe('Login business user', () => {
    it('Given valid first owner login credentials should return token', done => {
      const loginCredentials = {
        email: firstUserOwner.email,
        password: firstUserOwner.password
      };
      chai
        .request(app)
        .post('/business/auth')
        .set('Content-Type', 'application/json')
        .send(loginCredentials)
        .end(function (error, res) {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200), 'status is not 200';
          const result = compareToken(res.body.token, firstUserOwnerToken);
          assert.equal(result, true, result.message);
          done();
        });
    });

    it('Given valid added owner login credentials should return token', done => {
      const loginCredentials = {
        email: userOwner.email,
        password: userOwner.password
      };
      chai
        .request(app)
        .post('/business/auth')
        .set('Content-Type', 'application/json')
        .send(loginCredentials)
        .end(function (error, res) {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200), 'status is not 200';
          const result = compareToken(res.body.token, userOwnerToken);
          assert.equal(result, true, result.message);
          done();
        });
    });

    it('Given valid staff login credentials should return token', done => {
      const loginCredentials = {
        email: userStaff.email,
        password: userStaff.password
      };
      chai
        .request(app)
        .post('/business/auth')
        .set('Content-Type', 'application/json')
        .send(loginCredentials)
        .end(function (error, res) {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200), 'status is not 200';
          const result = compareToken(res.body.token, userStaffToken);
          assert.equal(result, true, result.message);
          done();
        });
    });
  });
});
