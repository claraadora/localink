const chai = require('chai');
const chaiHTTP = require('chai-http');
var expect = chai.expect;

//Configure chai
chai.use(chaiHTTP);

const { business, userOwner } = require('../seed/seed');
const User = require('../../../models/User');

describe('test the business model', () => {
  it('business object should be invalid if shopName is empty', done => {
    const user = new User(userOwner);
    const businessFields = {
      users: [user]
    };
    const business = new Business(businessFields);
    business.validate(function (err) {
      expect(err.errors.shopName).to.exist;
      done();
    });
  });

  it('business object should be invalid if users is empty', done => {
    const businessFields = {
      shopName: business.shopName
    };
    const businessObj = new Business(businessFields);
    businessObj.validate(function (err) {
      expect(err.errors.users).to.exist;
      done();
    });
  });
});
