const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authBusiness = require('../../../middleware/authBusiness');
const checkObjectId = require('../../../middleware/checkObjectId');

const Business = require('../../../models/Business');
const Shop = require('../../../models/Shop');
const Product = require('../../../models/Product');

// @route    POST business/product
// @desc     Create a product
// @access   Private
router.post(
  '/',
  [
    authBusiness,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('image', 'Image is required').not().isEmpty(),
      check('price', 'Price is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //const profile = await Business.findById(req.user.id);
      // let shop = await Shop.findById(profile.shop);
      let shop = await Shop.findOne({
        owner: req.user.id
      });

      if (!shop) {
        console.log(
          'shop not found, please create shop first before adding products'
        );
      }

      const newProduct = new Product({
        shop: shop.id,
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price
      });

      await newProduct.save();

      shop.products.unshift(newProduct);

      await shop.save();

      shop = await shop.populate('products').execPopulate();
      res.json(shop);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST business/product/:product_id;
// @desc     Update product
// @access   Private
router.post(
  '/:product_id',
  [checkObjectId('product_id'), authBusiness],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, image, description, price } = req.body;

    const productFields = {
      name,
      image,
      description,
      price
    };

    try {
      // Using upsert option (creates new doc if no match is found):
      let product = await Product.findOneAndUpdate(
        { _id: req.params.product_id },
        { $set: productFields },
        { new: true }
      );

      let shop = await Shop.findOne({ _id: product.shop });
      shop = await shop.populate('products').execPopulate();
      res.json(shop);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET business/product
// @desc     Get all products of a business
// @access   Private
// @return   Array of products
router.get('/', authBusiness, async (req, res) => {
  try {
    //const business = await Business.findById(req.params.business_id);
    const shop = await Shop.findOne({ owner: req.user.id }).populate({
      path: 'products',
      model: 'Product'
    });
    res.json(shop.products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE business/product/:product_id
// @desc     Delete a product
// @access   Private
router.delete(
  '/:product_id',
  [authBusiness, checkObjectId('product_id')],
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.product_id);

      if (!product) {
        return res.status(401).json({ msg: 'Product not found' });
      }

      let shop = await Shop.findById(product.shop);

      // Check user
      if (shop.owner.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      await product.remove();
      shop = await shop.populate('products').execPopulate();
      res.json(shop);
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
