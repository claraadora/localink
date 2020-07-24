const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');

const Shopper = require('../../models/Shopper');

async function getShopper(req, res) {
  try {
    let shopper = await Shopper.findById(req.user.id);

    if (!shopper) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Shopper's profile not found" }] });
    }

    res.status(200).json(shopper);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
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
    const shopper = await Shopper.findById(req.user.id);
    shopper.avatar = url;
    await shopper.save();
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
    let shopper = await Shopper.findOne({ _id: req.user.id });

    if (!shopper) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    shopper.email = email;
    await shopper.save();
    res.status(200).json(shopper);
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
    let shopper = await Shopper.findOne({ _id: req.user.id });

    if (!shopper) {
      console.log('here');
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(oldPassword, shopper.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const salt = await bcrypt.genSalt(10);

    shopper.password = await bcrypt.hash(newPassword, salt);

    await shopper.save();

    const payload = {
      shopper: {
        id: shopper.id
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

module.exports = { getShopper, uploadAvatar, updateEmail, updatePassword };
