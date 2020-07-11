const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const assert = chai.assert;
const {
  dummyShopper,
  shopperToken,
  registerCredentials,
  addDummyShopper,
  removeDummyShopper,
  removeAddedDummyShopper,
  registerShopper,
  compareToken
} = require('./seed/seed');

//Configure chai
chai.use(chaiHTTP);

const app = require('../../server');

let result = null;

describe('indexControllerShopper', () => {
  afterEach(removeAddedDummyShopper);
  describe('Register shopper', () => {
    it('Registered shopper should be saved', done => {
      chai
        .request(app)
        .post('/')
        .set('Content-Type', 'application/json')
        .send(registerCredentials)
        .end(async function (error, res) {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 250, 'status is not 200');
          const shopper = await Shopper.findOne({
            email: registerCredentials.email
          });
          const status = shopper.isAccountActive;
          assert.equal(status, false, 'default activation status is not false');
          assert.equal(
            shopper.name,
            registerCredentials.name,
            'Name is different'
          );
          assert.equal(
            shopper.email,
            registerCredentials.email,
            'Email is different'
          );
          done();
        });
    });

    it('Should send activation email successful registration', done => {
      chai
        .request(app)
        .post('/')
        .set('Content-Type', 'application/json')
        .send(registerCredentials)
        .end(async function (error, res) {
          assert.equal(error, null, 'error is not null');
          assert.equal(res.status, 250, 'status is not 200');
          assert.equal(res.body, 'Email sent successfully');
          done();
        });
    });
  });

  describe('Test account activation', () => {
    beforeEach(async () => {
      this.activationLink = await registerShopper();
    });
    it('Registered account should be active after activation', done => {
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
