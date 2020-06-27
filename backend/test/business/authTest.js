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
  addDummyUsers
} = require('./seed/seed');

//Configure chai
chai.use(chaiHTTP);
chai.should();

//const authControllerBusiness = require('../../controllers/business/authControllerBusiness');
const app = require('../../server');

beforeEach(addDummyUsers);
//addDummyUsers();

describe('authControllerBusiness', function () {
  //Test to get user by token
  it('Given first business owner token should return business object', done => {
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

  it('Given added business owner token should return business object', done => {
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

  it('Given added business staff token should return business object', done => {
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

  //Test to login
});
