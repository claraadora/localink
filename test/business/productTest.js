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
  addDummyProduct,
  removeDummyProduct,
  removeAddedDummyProduct
} = require('./seed/seedProduct');

//Configure chai
chai.use(chaiHTTP);

const app = require('../../server');
const Product = require('../../backend/models/Product');

describe('productControllerBusiness', () => {
  beforeEach(addDummyUsers);
  beforeEach(addDummyProfileToBusiness);
  beforeEach(addDummyProduct);
  afterEach(removeDummyProduct);
  after(removeAddedDummyProduct);
  afterEach(deleteDummyShopOfBusiness);
  afterEach(removeDummyUsers);

  it('Should update product and return updated shop', done => {
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
        const productInShop = res.body.products[0];
        expect(res => {
          expect(productInShop).to.include(dummyProduct);
        });
        done();
      });
  });

  it('Should delete product and return updated shop', done => {
    chai
      .request(app)
      .delete(`/business/product/${dummyProduct._id}`)
      .set('x-auth-token', firstUserOwnerToken)
      .send({})
      .end(async (error, res) => {
        const productArr = res.body.products;
        const newProductArr = productArr.filter(
          product => product._id == dummyProduct._id
        );
        assert.equal(newProductArr, 0, 'Product in shop not deleted');
        const product = await Product.findById(dummyProduct._id);
        assert.equal(product, null, 'Product obj not deleted');
        done();
      });
  });

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
        const newProduct = await Product.findById(shop.products[0]);
        expect(res => {
          expect(newProduct).to.include(dummyProduct);
        });
        assert.deepEqual(newProduct.shop, shop._id, 'Shop id set incorrectly');
        const productInShop = res.body.products[0];
        expect(res => {
          expect(productInShop).to.include(dummyProduct);
        });
        done();
      });
  });
});
