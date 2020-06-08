const express = require('express');
const connectDB = require('./config/db');

const app = express();

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

//Define routes for shoppers
app.use('/', require('./routes/api/shopper/index'));
app.use('/auth', require('./routes/api/shopper/auth'));
app.use('/profile', require('./routes/api/shopper/profile'));
app.use('/review', require('./routes/api/shopper/review'));

//Define route for searching
app.use('/search', require('./routes/api/shopper/search'));

//Define route for forgot password
app.use('/business/reset_password', require('./routes/api/email/email.router'));

//Define route to get distance to shop
app.use('', require('./routes/api/distance/distance.router'));

// const getCurrentLoc = require('./routes/api/distance/geolocation');
// getCurrentLoc();

// const getDist = require('./routes/api/distance/distance');
// getDist('bedok mall', '21 kent ridge road').then(dist => console.log(dist));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
