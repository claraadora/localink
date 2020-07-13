const chai = require('chai');
const chaiHTTP = require('chai-http');
const assert = chai.assert;
const expect = require('expect');
const {
  dummyShopper,
  shopperToken,
  registerCredentials,
  addDummyShopper,
  removeDummyShopper,
  removeAddedDummyShopper,
  registerShopper,
  compareToken,
  getShopperFromToken
} = require('./seed/seed');

const { newEmail, newPassword } = require('./seed/seedProfile');

const bcrypt = require('bcryptjs');

//Configure chai
chai.use(chaiHTTP);

//const authControllerBusiness = require('../../controllers/business/authControllerBusiness');
const app = require('../../server');

describe('profileControllerShopper', () => {
  beforeEach(addDummyShopper);
  afterEach(removeDummyShopper);

  describe('account settings', () => {
    it('Should return updated shopper with updated email', done => {
      chai
        .request(app)
        .post('/profile/account-settings-email')
        .set('x-auth-token', shopperToken)
        .send(newEmail)
        .end(async (error, res) => {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200, 'status is not 200');
          assert.equal(res.body.email, newEmail.email, 'email not updated');
          done();
        });
    });

    it('Should return updated shopper with updated password', done => {
      chai
        .request(app)
        .post('/profile/account-settings-password')
        .set('x-auth-token', shopperToken)
        .send(newPassword)
        .end(async (error, res) => {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200, 'status is not 200');
          const returnedHashedPassword = (
            await getShopperFromToken(res.body.token)
          ).password;
          const isMatch = await bcrypt.compare(
            newPassword.newPassword,
            returnedHashedPassword
          );
          assert.equal(isMatch, true, 'password not updated');
          done();
        });
    });
  });
});
