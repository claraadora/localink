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
  getShopFromToken,
  clearDB
} = require('./seed/seed');
const {
  dummyProfile,
  updatedDummyProfile,
  addDummyProfileToBusiness,
  deleteDummyShopOfBusiness
} = require('./seed/seedProfile');
const {
  dummyProduct,
  updatedDummyProduct,
  addDummyProduct
} = require('./seed/seedProduct');

//Configure chai
chai.use(chaiHTTP);

const app = require('../../server');
const Product = require('../../models/Product');

beforeEach(addDummyUsers);
beforeEach(addDummyProfileToBusiness);
afterEach(removeDummyUsers);
afterEach(deleteDummyShopOfBusiness);

describe('productControllerBusiness', () => {
  it('Should create new product and return updated shop', done => {
    chai
      .request(app)
      .post('/business/product')
      .set('x-auth-token', firstUserOwnerToken)
      .send(dummyProduct)
      .end(async (error, res) => {
        assert.equal(error, null, 'error is not null');
        assert.equal(res.status, 200, 'status is not 200');
        const shop = await Shop.findOne({ owner: business._id });
        const newProduct = await Product.findById(
          shop.products[shop.products.length - 1]
        );
        expect(res => {
          expect(newProduct).to.include(dummyProduct);
        });

        assert.deepEqual(newProduct.shop, shop._id, 'Shop id set incorrectly');
        done();
      });
  });
  it('Should update product and return updated shop', done => {
    addDummyProduct();
    chai
      .request(app)
      .post(`/business/product/${dummyProduct._id}`)
      .set('x-auth-token', firstUserOwnerToken)
      .send(updatedDummyProduct)
      .end(async (error, res) => {
        assert.equal(error, null, 'error is not null');
        assert.equal(res.status, 200, 'status is not 200');
        const product = await Product.findById(dummyProduct._id);
        expect(res => {
          expect(product).to.include(updatedDummyProduct);
        });
        done();
      });
  });
});
