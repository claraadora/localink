const { ObjectID } = require('mongodb');

const { business } = require('../../business/seed/seed');

const { dummyProfile } = require('../../business/seed/seedProfile');
const Product = require('../../../models/Product');
const Shop = require('../../../models/Shop');

const productId1 = new ObjectID();
const productId2 = new ObjectID();
const productId3 = new ObjectID();
const productId4 = new ObjectID();
const productId5 = new ObjectID();
const productId6 = new ObjectID();
const productId7 = new ObjectID();
const productId8 = new ObjectID();
const productId9 = new ObjectID();
const productId10 = new ObjectID();
const productId11 = new ObjectID();

//test boost
const dummyProduct1 = {
  _id: productId1,
  shop: dummyProfile._id,
  name: 'test product delete',
  image: 'test img url',
  description: 'test description',
  price: 10,
  stock: 3,
  isService: false
};

const dummyProduct2 = {
  _id: productId2,
  shop: dummyProfile._id,
  name: 'test product',
  image: 'test img url',
  description: 'test description delete',
  price: 10,
  stock: 3,
  isService: false
};

const dummyProduct3 = {
  _id: productId3,
  shop: dummyProfile._id,
  name: 'test delete product',
  image: 'test img url',
  description: 'test description',
  price: 10,
  stock: 3,
  isService: false
};

//test fuzzy search
const dummyProduct4 = {
  _id: productId4,
  shop: dummyProfile._id,
  name: 'test product deletes',
  image: 'test img url',
  description: 'test description',
  price: 10,
  stock: 3,
  isService: false
};

const dummyProduct5 = {
  _id: productId5,
  shop: dummyProfile._id,
  name: "test product delete's",
  image: 'test img url',
  description: 'test description',
  price: 10,
  stock: 3,
  isService: false
};

const dummyProduct6 = {
  _id: productId6,
  shop: dummyProfile._id,
  name: 'test product delate',
  image: 'test img url',
  description: 'test description',
  price: 10,
  stock: 3,
  isService: false
};

const dummyProduct7 = {
  _id: productId7,
  shop: dummyProfile._id,
  name: 'test product selete',
  image: 'test img url',
  description: 'test description',
  price: 10,
  stock: 3,
  isService: false
};

const dummyProduct8 = {
  _id: productId8,
  shop: dummyProfile._id,
  name: 'test product deletin',
  image: 'test img url',
  description: 'test description',
  price: 10,
  stock: 3,
  isService: false
};

const dummyProduct9 = {
  _id: productId9,
  shop: dummyProfile._id,
  name: 'test product bulete',
  image: 'test img url',
  description: 'test description',
  price: 10,
  stock: 3,
  isService: false
};

//test same base word
const dummyProduct10 = {
  _id: productId10,
  shop: dummyProfile._id,
  name: 'test product deletion',
  image: 'test img url',
  description: 'test description',
  price: 10,
  stock: 3,
  isService: false
};

const dummyProduct11 = {
  _id: productId11,
  shop: dummyProfile._id,
  name: 'test product deleteion',
  image: 'test img url',
  description: 'test description',
  price: 10,
  stock: 3,
  isService: false
};

const allProducts = [
  dummyProduct1,
  dummyProduct2,
  dummyProduct3,
  dummyProduct4,
  dummyProduct5,
  dummyProduct6,
  dummyProduct7,
  dummyProduct8,
  dummyProduct9,
  dummyProduct10,
  dummyProduct11
];

const searchQuery = {
  search: 'delete',
  service: false
};

async function addDummyProducts() {
  try {
    const shop = await Shop.findOne({ owner: business._id });
    allProducts.forEach(async dummyProduct => {
      const product = new Product(dummyProduct);
      await product.save();
      shop.products.unshift(product);
    });
    await shop.save();
  } catch (error) {
    console.log(error);
  }
}

async function removeDummyProducts() {
  try {
    const shop = await Shop.findOne({ owner: business._id });
    allProducts.forEach(async dummyProduct => {
      await Product.findByIdAndDelete(dummyProduct._id);
      shop.products.shift();
    });
    await shop.save();
  } catch (error) {
    console.log(error);
  }
}

function isScoreBoosted(productArr) {
  const arr = productArr.filter(product => {
    return (
      product._id === productId1.toString() ||
      product._id === productId2.toString() ||
      product._id === productId3.toString()
    );
  });
  console.log(arr);
  const matchTitle1 = arr.find(product => product._id === productId1.toString())
    .score;
  const matchDescr = arr.find(product => product._id === productId2.toString())
    .score;
  const matchTitle2 = arr.find(product => product._id === productId3.toString())
    .score;
  return matchTitle1 > matchDescr && matchTitle2 > matchDescr;
}

function fuzzyMatch1(productArr) {
  const arr = productArr.filter(product => {
    return (
      product._id === productId4.toString() ||
      product._id === productId5.toString() ||
      product._id === productId6.toString() ||
      product._id === productId7.toString()
    );
  });
  return arr.length === 4;
}

function fuzzyMatch2(productArr) {
  const arr = productArr.filter(product => {
    return (
      product._id === productId8.toString() ||
      product._id === productId9.toString()
    );
  });
  return arr.length === 2;
}

function matchSameBaseword(productArr) {
  const arr = productArr.filter(product => {
    return (
      product._id === productId10.toString() ||
      product._id === productId11.toString()
    );
  });
  return arr.length === 2;
}

function compare(elem1, elem2) {
  return elem2.score - elem1.score;
}

module.exports = {
  allProducts,
  searchQuery,
  addDummyProducts,
  removeDummyProducts,
  isScoreBoosted,
  fuzzyMatch1,
  fuzzyMatch2,
  matchSameBaseword,
  compare
};
