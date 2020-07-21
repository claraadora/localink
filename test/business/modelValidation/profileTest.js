const chai = require('chai');
const chaiHTTP = require('chai-http');
var expect = chai.expect;

//Configure chai
chai.use(chaiHTTP);

const { business } = require('../seed/seed');
const { dummyProfile } = require('../seed/seedProfile');
const Shop = require('../../../models/Shop');

describe('test profile model', () => {
  it('shop profile object should be invalid if shopName is empty', done => {
    const shopFields = {
      owner: business._id,
      address: dummyProfile.address,
      latLng: dummyProfile.latLng
    };
    const shop = new Shop(shopFields);
    shop.validate(function (error) {
      expect(error.errors.shopName).to.exist;
      done();
    });
  });

  it('shop profile object should be invalid if owner is empty', done => {
    const shopFields = {
      shopName: dummyProfile.shopName,
      address: dummyProfile.address,
      latLng: dummyProfile.latLng
    };
    const shop = new Shop(shopFields);
    shop.validate(function (error) {
      expect(error.errors.owner).to.exist;
      done();
    });
  });

  it('shop profile object should be invalid if owner is in wrong type', done => {
    const shopFields = {
      owner: business.shopName,
      shopName: dummyProfile.shopName,
      address: dummyProfile.address,
      latLng: dummyProfile.latLng
    };
    const shop = new Shop(shopFields);
    shop.validate(function (error) {
      expect(error.errors.owner).to.exist;
      done();
    });
  });

  it('shop profile object should be invalid if address is empty', done => {
    const shopFields = {
      shopName: dummyProfile.shopName,
      latLng: dummyProfile.latLng,
      owner: business._id
    };
    const shop = new Shop(shopFields);
    shop.validate(function (error) {
      expect(error.errors.address).to.exist;
      done();
    });
  });

  it('shop profile object should be invalid if latLng is empty', done => {
    const shopFields = {
      owner: business._id,
      shopName: dummyProfile.shopName,
      address: dummyProfile.address
    };
    const shop = new Shop(shopFields);
    shop.validate(function (error) {
      expect(error.errors.latLng).to.exist;
      done();
    });
  });
});
