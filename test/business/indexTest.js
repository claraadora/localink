const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const assert = chai.assert;
const {
  registerCredentials,
  registerUser,
  removeAddedDummyUsers
} = require('./seed/seed');

//Configure chai
chai.use(chaiHTTP);

const app = require('../../server');

describe('indexControllerBusiness', () => {
  afterEach(removeAddedDummyUsers);
  describe('Register business', () => {
    it('Registered business should be saved', done => {
      chai
        .request(app)
        .post('/business')
        .set('Content-Type', 'application/json')
        .send(registerCredentials)
        .end(async function (error, res) {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 250, 'status is not 200');
          const user = await User.findOne({ email: registerCredentials.email });
          const business = await Business.findOne({
            users: mongoose.Types.ObjectId(user.id)
          });
          const status = user.isAccountActive;
          assert.equal(status, false, 'default activation status is not false');
          assert.equal(
            business.shopName,
            registerCredentials.shopName,
            'Shop name is different'
          );
          assert.equal(
            user.name,
            registerCredentials.name,
            'Name is different'
          );
          assert.equal(
            user.email,
            registerCredentials.email,
            'Email is different'
          );
          done();
        });
    });

    it('Should send activation email successful registration', done => {
      chai
        .request(app)
        .post('/business')
        .set('Content-Type', 'application/json')
        .send(registerCredentials)
        .end(async function (error, res) {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 250, 'status is not 250');
          assert.equal(res.body, 'Email sent successfully');
          done();
        });
    });
  });

  describe('Test account activation', () => {
    beforeEach(async () => {
      this.activationLink = await registerUser();
    });
    it('Registered account should be active', done => {
      chai
        .request(app)
        .get(this.activationLink)
        .end(async function (error, res) {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 200, 'status is not 200');
          assert.equal(res.text, 'Activated account successfully');
          done();
        });
    });
  });
});
