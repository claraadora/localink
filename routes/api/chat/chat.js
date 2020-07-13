// const server = require('http').createServer(app);
// const io = require('socket.io')(server);

const Message = require('../../../models/Message');
const Chat = require('../../../models/Chat');
const Shop = require('../../../models/Shop');

const moment = require('moment');

module.exports = io => {
  io.on('connection', socket => {
    socket.on('Input Chat Message', async msg => {
      // connectDB().then(async db => {
      try {
        const {
          userId,
          username,
          message,
          time,
          type,
          receiverId,
          isShopper
        } = msg;

        let shopper_id = receiverId;
        let shop_id = userId;
        // let isShopperSender = 'false';
        if (isShopper == 'true') {
          shopper_id = userId;
          shop_id = receiverId;
          // isShopperSender = 'true';
        }

        const newMessage = new Message({
          userId,
          username,
          message,
          time,
          type
        });

        await newMessage.save();

        let chat = new Chat({
          shopper: shopper_id,
          shop: shop_id,
          message: newMessage
          // isShopper: isShopperSender
        });

        await chat.save();

        return io.emit('Output Chat Message', newMessage);
      } catch (error) {
        console.log(error);
        return error;
      }
    });
    // });
  });
};
