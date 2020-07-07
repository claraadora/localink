const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authBusiness = require('../../../middleware/business/authBusiness');
const checkObjectId = require('../../../middleware/CheckObjectId');
const productControllerBusiness = require('../../../controllers/business/productControllerBusiness');

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
  productControllerBusiness.createProduct
);

// @route    POST business/product/:product_id;
// @desc     Update product
// @access   Private
router.post(
  '/:product_id',
  [checkObjectId('product_id'), authBusiness],
  productControllerBusiness.updateProduct
);

// @route    GET business/product
// @desc     Get all products of a business
// @access   Private
// @return   Array of products
router.get('/', authBusiness, productControllerBusiness.allProductsOfBusiness);

// @route    DELETE business/product/:product_id
// @desc     Delete a product
// @access   Private
router.delete(
  '/:product_id',
  [authBusiness, checkObjectId('product_id')],
  productControllerBusiness.deleteProduct
);

module.exports = router;
