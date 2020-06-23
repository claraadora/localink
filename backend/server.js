const express = require('express');
const connectDB = require('./config/db');
const connectClient = require('./config/clientdb');

// console.log('server: ' + db);
// connectClient().then(db => console.log('server: ' + db));

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

//Connect Mongodb client
connectClient();

//Connect Database
connectDB();

//load environment variables
const dotenv = require('dotenv');
dotenv.config();

// Init Middleware
app.use(express.json());

app.get('/', (req, res) => res.send('API running'));

//Define routes for businesses
app.use('/business', require('./routes/api/business/index'));
app.use('/business/auth', require('./routes/api/business/auth'));
app.use('/business/profile', require('./routes/api/business/profile'));
app.use('/business/product', require('./routes/api/business/product'));
app.use('/business/user', require('./routes/api/business/user'));
app.use('/business/review-reply', require('./routes/api/business/reviewReply'));
app.use(
  '/business/reset_password',
  require('./routes/api/email/business.email.router')
);

//Define routes for shoppers
app.use('/', require('./routes/api/shopper/index'));
app.use('/auth', require('./routes/api/shopper/auth'));
app.use('/profile', require('./routes/api/shopper/profile'));
app.use('/review', require('./routes/api/shopper/review'));
app.use('/search', require('./routes/api/shopper/search'));
app.use('/reset_password', require('./routes/api/email/shopper.email.router'));
app.use('/inbox', require('./routes/api/chat/inboxShopper'));
//Define route to get distance to shop
app.use('', require('./routes/api/distance/distance.router'));

//Chat
// app.io = require('socket.io')();
// require('./routes/api/chat/chat')(app);

const Message = require('./models/Message');
const Chat = require('./models/Chat');
const Shop = require('./models/Shop');

io.on('connection', socket => {
  socket.on('Input Chat Message', msg => {
    connectDB().then(async db => {
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
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
