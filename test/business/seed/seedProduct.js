const { ObjectID } = require('mongodb');
const productId = new ObjectID();

const { business } = require('./seed');

const { dummyProfile, profileId } = require('./seedProfile');
const Product = require('../../../models/Product');
const Shop = require('../../../models/Shop');
const Business = require('../../../models/Business');

const dummyProduct = {
  _id: productId,
  shop: dummyProfile._id,
  name: 'test product create, update, delete',
  image: 'img url',
  description: 'just a temporary test product',
  price: 10,
  stock: 3,
  isService: false
};

const updatedDummyProduct = {
  _id: productId,
  name: 'update test product create, update, delete',
  image: 'update img url',
  description: 'update just a temporary test product',
  price: 10,
  stock: 3,
  isService: false
};

const dummyProductForReview = {
  _id: productId,
  name: 'test product to test shopper creating a review',
  shop: profileId,
  image: 'img url',
  description: 'just a temporary test product',
  price: 10,
  stock: 3,
  isService: false
};

async function addDummyProduct(dummyProduct) {
  const product = new Product(dummyProduct);
  try {
    await product.save();
    const shop = await Shop.findOne({ owner: business._id });
    shop.products.unshift(product);
    await shop.save();
  } catch (error) {
    console.log(error.message);
  }
}

async function removeDummyProduct(dummyProduct) {
  await Product.findByIdAndDelete(dummyProduct._id);
  const shop = await Shop.findOne({ owner: business._id });
  shop.products.shift();
  await shop.save();
}

async function removeAddedDummyProduct() {
  await Product.findOneAndDelete({ name: dummyProduct.name });
  await Product.findOneAndDelete({ name: dummyProduct.name });
  await Business.findOneAndDelete({ shopName: business.shopName });
}

module.exports = {
  dummyProduct,
  updatedDummyProduct,
  dummyProductForReview,
  addDummyProduct,
  removeDummyProduct,
  removeAddedDummyProduct
};
