const express = require('express');
const router = express.Router();
const connectClient = require('../../../config/clientdb');
const mongoose = require('mongoose');

const Shopper = require('../../../models/Shopper');
const Chat = require('../../../models/Chat');

// @route    GET /inbox/:shopper_id
// @desc     Get all coversations of shopper
// @access   Private
// @return   User
router.get('/:shopper_id', async (req, res) => {
  try {
    const shopperId = req.params.shopper_id;
    const chatList = [];
    const db = await connectClient();
    db.collection('chats')
      .aggregate([
        {
          $match: {
            $expr: {
              shopper: '$shopperId' //get object whether or not shopper is sender or receiver
            }
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
            _id: '$shop', //group messages by same shop id
            chatList: { $push: '$message' }
          }
        },
        {
          $lookup: {
            from: 'messages',
            localField: 'chatList',
            foreignField: '_id',
            as: 'message_docs'
          }
        }
      ])
      .each(function (error, chat) {
        if (chat) {
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
