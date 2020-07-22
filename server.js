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
//app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

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
app.use('/business/inbox', require('./routes/api/chat/inboxBusiness'));
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
