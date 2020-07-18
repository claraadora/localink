const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const Business = require('../../models/Business');
const Shop = require('../../models/Shop');
const User = require('../../models/User');
const geocode = require('../../routes/api/distance/geocode');

async function getShop(req, res) {
  try {
    const shop = await Shop.findOne({
      owner: req.user.id
    });

    if (!shop) {
      shop = {};
      //return res.status(400).json({ msg: 'There is no shop for this user' });
    }

    await shop.populate({ path: 'reviews', model: 'Review' }).execPopulate();
    await shop.populate({ path: 'products', model: 'Product' }).execPopulate();

    res.json(shop);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

async function createOrUpdateProfile(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    shopName,
    avatar,
    description,
    address,
    distance,
    promotions,
    openingHours,
    contactDetails,
    delivery
  } = req.body;

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
    avatar,
    description,
    promotions,
    openingHours,
    contactDetails,
    delivery,
    address,
    latLng,
    distance
  };

  try {
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
    res.status(500).send('Server Error');
  }
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
    res.status(500).send('Server error');
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
    res.status(500).send('Server error');
  }
}

module.exports = {
  getShop,
  createOrUpdateProfile,
  updateEmail,
  updatePassword
};
