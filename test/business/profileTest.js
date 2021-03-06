const chai = require('chai');
const chaiHTTP = require('chai-http');
const assert = chai.assert;
const expect = require('expect');
const {
  firstUserOwnerToken,
  userStaffToken,
  addDummyUsers,
  removeDummyUsers,
  getUserFromToken,
  getShopFromToken
} = require('./seed/seed');
const {
  dummyProfile,
  updatedDummyProfile,
  newEmail,
  newPassword,
  newStaffPassword,
  addDummyProfileToBusiness,
  deleteDummyShopOfBusiness
} = require('./seed/seedProfile');

const bcrypt = require('bcryptjs');

const Shop = require('../../models/Shop');

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
            res.body.errors[0].msg,
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

    it('Should get and return specified shop', done => {
      chai
        .request(app)
        .get(`/business/profile/${dummyProfile._id}`)
        .end(async (error, res) => {
          const shop = await Shop.findById(dummyProfile._id);
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200, 'status is not 200');
          expect(res => {
            expect(res.body).to.eql(shop);
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
            res.body.errors[0].msg,
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

    it('Should return updated owner with updated email', done => {
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

    it('Should return updated staff with updated email', done => {
      chai
        .request(app)
        .post('/business/profile/account-settings-email')
        .set('x-auth-token', userStaffToken)
        .send(newEmail)
        .end(async (error, res) => {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200, 'status is not 200');
          assert.equal(res.body.email, newEmail.email, 'email not updated');
          done();
        });
    });

    it('Should return updated owner with updated password', done => {
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

    it('Should return updated staff with updated password', done => {
      chai
        .request(app)
        .post('/business/profile/account-settings-password')
        .set('x-auth-token', userStaffToken)
        .send(newStaffPassword)
        .end(async (error, res) => {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200, 'status is not 200');
          const returnedHashedPassword = (
            await getUserFromToken(res.body.token)
          ).password;
          const isMatch = await bcrypt.compare(
            newStaffPassword.newPassword,
            returnedHashedPassword
          );
          assert.equal(isMatch, true, 'password not updated');
          done();
        });
    });
  });
});
