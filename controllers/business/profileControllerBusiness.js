const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');
const path = require('path');

const Business = require('../../models/Business');
const Shop = require('../../models/Shop');
const User = require('../../models/User');
const geocode = require('../../routes/api/distance/geocode');

async function getShop(req, res) {
  try {
    let shop = await Shop.findOne({
      owner: req.user.id
    });

    if (!shop) {
      shop = {};
      //return res.status(400).json({ msg: 'There is no shop for this user' });
    } else {
      await shop.populate({ path: 'reviews', model: 'Review' }).execPopulate();
      await shop
        .populate({ path: 'products', model: 'Product' })
        .execPopulate();
    }

    res.status(200).json(shop);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
}

async function getSpecifiedShop(req, res) {
  try {
    let shop = await Shop.findById(req.params.shop_id);

    if (!shop) {
      shop = {};
      //return res.status(400).json({ msg: 'There is no shop for this user' });
    } else {
      await shop.populate({ path: 'reviews', model: 'Review' }).execPopulate();
      await shop
        .populate({ path: 'products', model: 'Product' })
        .execPopulate();
    }

    res.status(200).json(shop);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
}

async function createOrUpdateProfile(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    shopName,
    description,
    address,
    distance,
    promotions,
    openingHours,
    contactDetails,
    delivery
  } = req.body;

  try {
    const coordinates = await geocode(address);
    const latLng = {
      lat: coordinates.lat,
      lng: coordinates.lng
    };

    const profileFields = {
      shopName
    };

    const shopFields = {
      shopName,
      description,
      promotions,
      openingHours,
      contactDetails,
      delivery,
      address,
      latLng,
      distance
    };

    // Using upsert option (creates new doc if no match is found):
    let profile = await Business.findOneAndUpdate(
      { _id: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true }
    );

    let shop = await Shop.findOneAndUpdate(
      { owner: profile.id },
      { $set: shopFields },
      { new: true, upsert: true }
    );

    res.json(shop);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
}

async function uploadAvatar(req, res) {
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage }).single('file');

  upload(req, res, async err => {
    if (err) {
      return res.json({ success: false, err });
    }
    const image = {
      contentType: path.extname(req.file.originalname),
      data: req.file.buffer
    };
    const url = `data:image/${image.contentType};base64,${image.data.toString(
      'base64'
    )}`;
    const shop = await Shop.findOne({ owner: req.user.id });
    shop.avatar = url;
    await shop.save();
    return res.json({ success: true, url });
  });
}

async function updateEmail(req, res) {
  const errors = validationResult(req); //converts errors into error object
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    const user = await User.findById(req.user.user_id);

    user.email = email;
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
}

async function updatePassword(req, res) {
  const errors = validationResult(req); //converts errors into error object
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.user_id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    const payload = {
      business: {
        id: req.user.id,
        user_id: user.id
      }
    };

    //Create token
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
}

module.exports = {
  getShop,
  getSpecifiedShop,
  createOrUpdateProfile,
  uploadAvatar,
  updateEmail,
  updatePassword
};
