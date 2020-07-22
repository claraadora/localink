const express = require('express');
const router = express.Router();
const authBusiness = require('../../../middleware/business/authBusiness');
const authShopper = require('../../../middleware/shopper/authShopper');
const multer = require('multer');
const path = require('path');

const Shop = require('../../../models/Shop');
const Message = require('../../../models/Message');

// @route    POST business/chat/upload-attachment;
// @desc     Send attachment: image or video
// @access   Private
router.post('/business/upload-attachment', authBusiness, async (req, res) => {
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

    return res.json({ success: true, url });
  });
});

// @route    POST /chat/upload-attachment;
// @desc     Send attachment: image or video
// @access   Private
router.post('/upload-attachment', authShopper, async (req, res) => {
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

    return res.json({ success: true, url });
  });
});

module.exports = router;
