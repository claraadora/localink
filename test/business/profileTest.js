const chai = require('chai');
const chaiHTTP = require('chai-http');
const assert = chai.assert;
const expect = require('expect');
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
  compareToken,
  getBusinessFromToken,
  getUserFromToken,
  getShopFromToken,
  clearDB
} = require('./seed/seed');
const {
  dummyProfile,
  updatedDummyProfile,
  newEmail,
  newPassword,
  addDummyProfileToBusiness,
  deleteDummyShopOfBusiness
} = require('./seed/seedProfile');

const bcrypt = require('bcryptjs');

//Configure chai
chai.use(chaiHTTP);

//const authControllerBusiness = require('../../controllers/business/authControllerBusiness');
const app = require('../../server');

describe('profileControllerBusiness', () => {
  beforeEach(addDummyUsers);
  afterEach(removeDummyUsers);
  after(deleteDummyShopOfBusiness);
  describe('profile settings', () => {
    it('Should create and return new profile if no existing profile', done => {
      chai
        .request(app)
        .post('/business/profile')
        .set('x-auth-token', firstUserOwnerToken)
        .send(dummyProfile)
        .end(async (error, res) => {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200, 'status is not 200');
          assert.exists(res.body, 'Returned shop either null or undefined');
          assert.hasAnyKeys(
            res.body,
            'latLng',
            'latLng not calculated, field not present'
          );
          assert.isObject(
            res.body.latLng,
            'lat lng field in profile is not an object'
          );
          expect(res => {
            expect(res.body).to.include(dummyProfile);
          });
          done();
        });
    });

    it('Should return unauthorised access, action: create profile by staff', done => {
      chai
        .request(app)
        .post('/business/profile')
        .set('x-auth-token', userStaffToken)
        .send(dummyProfile)
        .end(async (error, res) => {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 403, 'status is not 403');
          assert.exists(res.body, 'Returned shop either null or undefined');
          assert.equal(
            res.body.msg,
            'authorization denied, only owner has access'
          );
          done();
        });
    });

    it("Should get and return logged in user's created shop", done => {
      chai
        .request(app)
        .get('/business/profile/me')
        .set('x-auth-token', firstUserOwnerToken)
        .end(async (error, res) => {
          const shopInInputToken = await getShopFromToken(firstUserOwnerToken);
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200, 'status is not 200');
          expect(res => {
            expect(res.body).to.eql(shopInInputToken);
          });
          done();
        });
    });

    it('Should update and return updated profile if existing profile present', done => {
      chai
        .request(app)
        .post('/business/profile')
        .set('x-auth-token', firstUserOwnerToken)
        .send(updatedDummyProfile)
        .end(async (error, res) => {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200), 'status is not 200';
          assert.exists(res.body, 'Returned shop either null or undefined');
          expect(res => {
            expect(res.body).to.include(updatedDummyProfile);
          });
          done();
        });
    });

    it('Should return unauthorised access, action: update profile by staff', done => {
      chai
        .request(app)
        .post('/business/profile')
        .set('x-auth-token', userStaffToken)
        .send(updatedDummyProfile)
        .end(async (error, res) => {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 403, 'status is not 403');
          assert.exists(res.body, 'Returned shop either null or undefined');
          assert.equal(
            res.body.msg,
            'authorization denied, only owner has access'
          );
          done();
        });
    });

    it("Should get and return logged in user's updated shop", done => {
      chai
        .request(app)
        .get('/business/profile/me')
        .set('x-auth-token', firstUserOwnerToken)
        .end(async (error, res) => {
          const shopInInputToken = await getShopFromToken(firstUserOwnerToken);
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200, 'status is not 200');
          expect(res => {
            expect(res.body).to.eql(shopInInputToken);
          });
          done();
        });
    });
  });

  describe('account settings', () => {
    beforeEach(addDummyProfileToBusiness);
    afterEach(deleteDummyShopOfBusiness);

    it('Should return updated user with updated email', done => {
      chai
        .request(app)
        .post('/business/profile/account-settings-email')
        .set('x-auth-token', firstUserOwnerToken)
        .send(newEmail)
        .end(async (error, res) => {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200, 'status is not 200');
          assert.equal(res.body.email, newEmail.email, 'email not updated');
          done();
        });
    });

    it('Should return unauthorised access, action: update email by staff', done => {
      chai
        .request(app)
        .post('/business/profile/account-settings-email')
        .set('x-auth-token', userStaffToken)
        .send(newEmail)
        .end(async (error, res) => {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 403, 'status is not 403');
          assert.equal(
            res.body.msg,
            'authorization denied, only owner has access'
          );
          done();
        });
    });

    it('Should return updated user with updated password', done => {
      chai
        .request(app)
        .post('/business/profile/account-settings-password')
        .set('x-auth-token', firstUserOwnerToken)
        .send(newPassword)
        .end(async (error, res) => {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200, 'status is not 200');
          const returnedHashedPassword = (
            await getUserFromToken(res.body.token)
          ).password;
          const isMatch = await bcrypt.compare(
            newPassword.newPassword,
            returnedHashedPassword
          );
          assert.equal(isMatch, true, 'password not updated');
          done();
        });
    });

    it('Should return unauthorised access, action: update password by staff', done => {
      chai
        .request(app)
        .post('/business/profile/account-settings-password')
        .set('x-auth-token', userStaffToken)
        .send(newPassword)
        .end(async (error, res) => {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 403, 'status is not 403');
          assert.equal(
            res.body.msg,
            'authorization denied, only owner has access'
          );
          done();
        });
    });
  });
});
