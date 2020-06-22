//const io = require('socket.io')(server);

const Message = require('../../../models/Message');
const Chat = require('../../../models/Chat');
const Shop = require('../../../models/Shop');

module.exports = app => {
  app.io.on('connection', socket => {
    socket.on('Input Chat Message', async msg => {
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
        let business_id = userId;
        let isShopperSender = false;
        if (isShopper) {
          shopper_id = userId;
          business_id = receiverId;
          isShopperSender = true;
        }

        const shop = await Shop.findOne({ owner: business_id });

        const newMessage = new Message({
          userId,
          username,
          message,
          time,
          type
        });

        let chat = new Chat({
          shopper: shopper_id,
          shop: shop.id,
          message: newMessage,
          isShopper: isShopperSender
        });

        await chat.save();

        if (isShopper) {
          chat = await chat.populate('shopper').execPopulate();
        } else {
          chat = await chat.populate('business').execPopulate();
        }
        return io.emit('Output Chat Message', chat);
      } catch (error) {
        console.log(error);
        res.status(500).json('Server error');
      }
    });
  });
};
