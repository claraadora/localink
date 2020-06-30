const { ObjectID } = require('mongodb');
const productId = new ObjectID();

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
} = require('./seed');

const {
  dummyProfile,
  updatedDummyProfile,
  newEmail,
  newPassword,
  addDummyProfileToBusiness,
  deleteDummyShopOfBusiness
} = require('./seedProfile');
const Product = require('../../../models/Product');

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

async function addDummyProduct() {
  const product = new Product(dummyProduct);
  await product.save();
  // console.log(business._id);
  // const shop = Shop.findOne({ owner: business._id });
  // shop.products.push(product);
  // await shop.save();
}

module.exports = { dummyProduct, updatedDummyProduct, addDummyProduct };
