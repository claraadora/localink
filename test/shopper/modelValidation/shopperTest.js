const chai = require('chai');
const chaiHTTP = require('chai-http');
var expect = chai.expect;

//Configure chai
chai.use(chaiHTTP);

const { dummyShopper } = require('../seed/seed');
const Shopper = require('../../../models/Shopper');

describe('test shopper model', () => {
  it('shopper object should be invalid if name is empty', done => {
    const shopperFields = {
      email: dummyShopper.email,
      password: dummyShopper.password
    };
    const shopper = new Shopper(shopperFields);
    shopper.validate(error => {
      expect(error.errors.name).to.exist;
      done();
    });
  });

  it('shopper object should be invalid if email is empty', done => {
    const shopperFields = {
      name: dummyShopper.name,
      password: dummyShopper.password
    };
    const shopper = new Shopper(shopperFields);
    shopper.validate(error => {
      expect(error.errors.email).to.exist;
      done();
    });
  });

  it('shopper object should be invalid if password is empty', done => {
    const shopperFields = {
      name: dummyShopper.name,
      email: dummyShopper.email
    };
    const shopper = new Shopper(shopperFields);
    shopper.validate(error => {
      expect(error.errors.password).to.exist;
      done();
    });
  });
});
