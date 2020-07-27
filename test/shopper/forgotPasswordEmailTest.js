const chai = require('chai');
const chaiHTTP = require('chai-http');
const assert = chai.assert;
const {
  dummyShopper,
  shopperToken,
  addDummyShopper,
  removeDummyShopper
} = require('./seed/seed');

const {
  newPassword,
  getPasswordResetLinkInEmail
} = require('./seed/seedForgotPassword');

const Shopper = require('../../models/Shopper');
const bcrypt = require('bcryptjs');

//Configure chai
chai.use(chaiHTTP);

const app = require('../../server');

describe('forgotPasswordEmailController', () => {
  beforeEach(addDummyShopper);
  afterEach(removeDummyShopper);
  it('Should send email with password reset link', done => {
    chai
      .request(app)
      .post(`/reset_password/${dummyShopper.email}`)
      .send({ isShopper: true })
      .end(async function (error, res) {
        assert.equal(error, null, 'error is not null');
        assert.equal(res.status, 250, 'status is not 250');
        assert.equal(res.body, 'Email sent successfully');
        done();
      });
  });

  describe('Test forgot password option via password reset link', () => {
    beforeEach(async () => {
      this.passwordResetLink = await getPasswordResetLinkInEmail(
        dummyShopper.email
      );
    });
    it('Should successfully change password using password reset link', done => {
      chai
        .request(app)
        .post(this.passwordResetLink)
        .set('Content-Type', 'application/json')
        .send(newPassword)
        .end(async function (error, res) {
          console.log('b3');
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 202, 'status is not 200');
          assert.equal(res.text, 'Password change successful');
          const updatedHashedPassword = (
            await Shopper.findOne({ email: dummyShopper.email })
          ).password;

          const isMatch = await bcrypt.compare(
            newPassword.password,
            updatedHashedPassword
          );
          assert.equal(isMatch, true, 'password not updated');
          done();
        });
    });
  });
});
