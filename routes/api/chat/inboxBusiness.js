const express = require('express');
const router = express.Router();
const connectClient = require('../../../config/clientdb');
const mongoose = require('mongoose');

const Shopper = require('../../../models/Shopper');
const Shop = require('../../../models/Shop');
const Chat = require('../../../models/Chat');

// @route    GET /business/inbox/:shop_id
// @desc     Get all coversations of shop
// @access   Private
// @return   User
router.get('/:shop_id', async (req, res) => {
  try {
    const shopId = req.params.shop_id;
    const chatList = [];
    const db = await connectClient();
    db.collection('chats')
      .aggregate([
        {
          $match: {
            shop: new mongoose.Types.ObjectId(shopId) //get object whether or not shopper is sender or receiver
          }
        },
        {
          $lookup: {
            from: 'messages',
            localField: 'message',
            foreignField: '_id',
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
            _id: '$shopper', //group messages by same shop id
            messageList: { $push: '$message' },
            shopper: { $first: '$shopper' },
            shop: { $first: '$shop' }
            //isShopper: { $ifrst: '$isShopper' }
          }
        },
        {
          $lookup: {
            from: 'messages',
            localField: 'messageList',
            foreignField: '_id',
            as: 'message_list'
          }
        },
        {
          $lookup: {
            from: 'shoppers',
            localField: 'shopper',
            foreignField: '_id',
            as: 'shopperName'
          }
        },
        {
          $lookup: {
            from: 'shops',
            localField: 'shop',
            foreignField: '_id',
            as: 'shopName'
          }
        },
        {
          $unset: ['messageList']
        }
      ])
      .each(async function (error, chat) {
        if (chat) {
          chat.shopperName = chat.shopperName[0].name;
          chat.shopName = chat.shopName[0].shopName;
          chatList.unshift(chat);
        } else {
          res.status(200).json(chatList);
        }
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
