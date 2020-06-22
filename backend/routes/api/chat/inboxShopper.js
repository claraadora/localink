const express = require('express');
const router = express.Router();
const connectClient = require('../../../config/clientdb');

const Shopper = require('../../../models/Shopper');
const Chat = require('../../../models/Chat');

// @route    GET /inbox/:shopper_id
// @desc     Get all coversations of shopper
// @access   Private
// @return   User
router.get('/inbox/:shopper_id', async (req, res) => {
  try {
    const shopperId = req.params.shop_id;
    const chatList = [];
    const db = await connectClient();
    db.collections('Chat')
      .aggregate([
        {
          $match: {
            shopper: shopperId //get object whether or not shopper is sender or receiver
          }
        },
        {
          $lookup: {
            from: 'message',
            localField: '_id',
            foreignField: 'message',
            as: 'message_docs'
          }
        },
        {
          $sort: {
            'message_docs.date': 1
          }
        },
        {
          $group: {
            _id: $business, //group messages by same business id
            chatList: { $push: $message }
          }
        }
      ])
      .each(function (error, chat) {
        if (chat) {
          chatList.unshift(chat);
        } else {
          res.status(200).json(products);
        }
      });
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
