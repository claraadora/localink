const chai = require('chai');
const chaiHTTP = require('chai-http');
var expect = chai.expect;

//Configure chai
chai.use(chaiHTTP);

const { dummyProfile } = require('../seed/seedProfile');
const Product = require('../../../models/Product');

describe('test product model', () => {
  it('product object should be invalid if shop is empty', done => {
    const productFields = {
      isService: false,
      name: 'product name',
      image: 'image url',
      price: 10
    };
    const product = new Product(productFields);
    product.validate(error => {
      expect(error.errors.shop).to.exist;
      done();
    });
  });

  it('product object should be invalid if shop is in wrong type', done => {
    const productFields = {
      shop: true,
      isService: false,
      name: 'product name',
      image: 'image url',
      price: 10
    };
    const product = new Product(productFields);
    product.validate(error => {
      expect(error.errors.shop).to.exist;
      done();
    });
  });

  it('product object should be invalid if isService is empty', done => {
    const productFields = {
      shop: dummyProfile._id,
      name: 'product name',
      image: 'image url',
      price: 10
    };
    const product = new Product(productFields);
    product.validate(error => {
      expect(error.errors.isService).to.exist;
      done();
    });
  });

  it('product object should be invalid if isService is in wrong type', done => {
    const productFields = {
      shop: dummyProfile._id,
      isService: 10,
      name: 'product name',
      image: 'image url',
      price: 10
    };
    const product = new Product(productFields);
    product.validate(error => {
      expect(error.errors.isService).to.exist;
      done();
    });
  });

  it('product object should be invalid if product name is empty', done => {
    const productFields = {
      shop: dummyProfile._id,
      isService: 10,
      image: 'image url',
      price: 10
    };
    const product = new Product(productFields);
    product.validate(error => {
      expect(error.errors.name).to.exist;
      done();
    });
  });

  it('product object should be invalid if image is empty', done => {
    const productFields = {
      shop: dummyProfile._id,
      isService: false,
      name: 'product name',
      price: 10
    };
    const product = new Product(productFields);
    product.validate(error => {
      expect(error.errors.image).to.exist;
      done();
    });
  });

  it('product object should be invalid if price is empty', done => {
    const productFields = {
      shop: dummyProfile._id,
      isService: false,
      image: 'image url',
      name: 'product name'
    };
    const product = new Product(productFields);
    product.validate(error => {
      expect(error.errors.price).to.exist;
      done();
    });
  });
});
