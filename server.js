const express = require('express');
const connectDB = require('./config/db');
const connectClient = require('./config/clientdb');
const path = require('path');

const app = express();

//load environment variables
const dotenv = require('dotenv');
dotenv.config();

//Connect Mongodb client
connectClient();

//Connect Database
connectDB();

// Init Middleware
app.use(express.json());

//use this to show the image you have in node js server to client (react js)
app.use('/uploads', express.static('uploads'));

//app.get('/', (req, res) => res.send('API running'));

//Define routes for businesses
app.use('/business', require('./routes/api/business/index'));
app.use(
  '/business/account-activation',
  require('./routes/api/business/accountActivation')
);
app.use('/business/auth', require('./routes/api/business/auth'));
app.use('/business/profile', require('./routes/api/business/profile'));
app.use('/business/product', require('./routes/api/business/product'));
app.use('/business/user', require('./routes/api/business/user'));
app.use('/business/review-reply', require('./routes/api/business/reviewReply'));
app.use(
  '/business/reset_password',
  require('./routes/api/business/forgotPasswordEmail')
);
app.use('/new-chat', require('./routes/api/chat/newChat'));

//Define routes for shoppers
app.use('/', require('./routes/api/shopper/index'));
app.use(
  '/account-activation',
  require('./routes/api/shopper/accountActivation')
);
app.use('/auth', require('./routes/api/shopper/auth'));
app.use('/profile', require('./routes/api/shopper/profile'));
app.use('/review', require('./routes/api/shopper/review'));
app.use('/search', require('./routes/api/shopper/search'));
app.use('/reset_password', require('./routes/api/shopper/forgotPasswordEmail'));
app.use('/inbox', require('./routes/api/chat/inboxShopper'));
//Define route to get distance to shop
app.use('', require('./routes/api/distance/distance.router'));
app.use(
  '/account-activation',
  require('./routes/api/shopper/accountActivation')
);

const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
  // fileFilter: (req, file, cb) => {
  //   const ext = path.extname(file.originalname)
  //   if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
  //     return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
  //   }
  //   cb(null, true)
  // }
});

var upload = multer({ storage: storage }).single('file');
const checkBusinessOwner = require('./middleware/business/CheckBusinessOwner');
app.post(
  '/business/profile/upload-avatar',
  checkBusinessOwner,
  async (req, res) => {
    console.log('inside upload avatar');

    upload(req, res, async err => {
      console.log(err);
      if (err) {
        return res.json({ success: false, err });
      }
      const url = res.req.file.path;
      const shop = await Shop.findOne({ owner: req.user.id });
      shop.avatar = url;
      await shop.save();
      return res.json({ success: true, url });
    });
  }
);

//Define chat route
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const chatRoute = require('./routes/api/chat/chat')(io);

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//For testing purposes
module.exports = app;
