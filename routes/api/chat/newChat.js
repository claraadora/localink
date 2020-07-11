const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Shopper = require('../../../models/Shopper');
const Shop = require('../../../models/Shop');
const Chat = require('../../../models/Chat');

// @route    GET /new-chat
// @desc     Add empty chat to chatList
// @access   Private
// @return   User
router.post('/', async (req, res) => {
  const { shopperId, shopId, isShopper } = req.body;

  // const newMessage = new Message({
  //     userId,
  //     username = '',
  //     message = '',
  //     time = '',
  //     type = ''
  //   });

  //   await newMessage.save();

  const chat = new Chat({
    shopper: shopperId,
    shop: shopId,
    message: null,
    isShopper
  });

  await chat.save();
  res.status(200).json('successful');
});

module.exports = router;
