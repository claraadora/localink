const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');

const Business = require('../../../models/Business');
const Shop = require('../../../models/Shop');
const Product = require('../../../models/Product');

// @route    POST business/product
// @desc     Create a product
// @access   Private
router.post(
  '/',
  [
    auth,
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
      const profile = await Business.findById(req.user.id);
      let shop = await Shop.findById(profile.shop);

      const newProduct = new Product({
        shop: shop.id,
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price
      });

      await newProduct.save();

      shop.product.unshift(newProduct);

      await shop.save();

      shop = await shop.populate('product', ['name', 'description']);

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
router.post('/:product_id', auth, async (req, res) => {
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

    console.log(req.params.product_id);
    console.log(productFields);
    console.log(await Product.findById(req.params.product_id));

    //await Business.populate(profile, { path: 'shop', model: 'Shop' });

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET business/products
// @desc     Get all products
// @access   Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('name'); //populate name and avatar fields in user
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
