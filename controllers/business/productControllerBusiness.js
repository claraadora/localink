const { validationResult } = require('express-validator');
const path = require('path');
const multer = require('multer');

const Shop = require('../../models/Shop');
const Product = require('../../models/Product');

async function createProduct(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let shop = await Shop.findOne({
      owner: req.user.id
    });

    if (!shop) {
      return res.status(403).json({
        msg: 'shop not found, please create shop first before adding products'
      });
    }

    const { name, image, description, price, stock, isService } = req.body;

    const newProduct = new Product({
      shop: shop.id,
      name,
      description,
      price,
      stock,
      isService,
      image
    });

    await newProduct.save();

    shop.products.unshift(newProduct);

    await shop.save();

    shop = await shop.populate('products').execPopulate();
    res.json(shop);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
}

async function uploadProductImage(req, res) {
  console.log(' upload image');
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage }).single('file');

  upload(req, res, async err => {
    if (err) {
      return res.json({ errors: [{ msg: err }] });
    }
    const image = {
      contentType: path.extname(req.file.originalname),
      data: req.file.buffer
    };
    console.log(image);
    const url = `data:image/${image.contentType};base64,${image.data.toString(
      'base64'
    )}`;

    return res.json({ success: true, url });
  });
}

async function updateProduct(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, image, description, price, stock, isService } = req.body;
  const productFields = {
    name,
    image,
    description,
    price,
    stock,
    isService
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
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
}

async function allProductsOfBusiness(req, res) {
  try {
    //const business = await Business.findById(req.params.business_id);
    const shop = await Shop.findOne({ owner: req.user.id }).populate({
      path: 'products',
      model: 'Product'
    });
    res.json(shop.products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findById(req.params.product_id);

    if (!product) {
      return res.status(401).json({ errors: [{ msg: 'Product not found' }] });
    }

    let shop = await Shop.findById(product.shop);

    // Check user
    if (shop.owner.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'User not authorized' }] });
    }

    await product.remove();
    shop = await shop.populate('products').execPopulate();
    res.json(shop);
  } catch (err) {
    console.error(err.message);

    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
}

module.exports = {
  createProduct,
  uploadProductImage,
  updateProduct,
  allProductsOfBusiness,
  deleteProduct
};
