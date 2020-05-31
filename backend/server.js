const express = require('express');
const connectDB = require('./config/db');
// const socketio = require('socket.io');
// const http = require('http');

const app = express();
// const server = http.createServer(app);
// const io = socketio(server);

//Connect Database
connectDB();

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
app.use('/review', require('./routes/api/review'));

//Define route for searching
app.use('/search', require('./routes/api/search'));

// //Define route for chat
// app.use('/chat', require('./routes/api/chat'));

// //Chat
// io.on('connection', (socket) => {
//     console.log("We have a new connection!");

//     socket.on('disconnect', () => {
//         console.log("User has left");
//     })

// })

// const getLocation = require('./routes/api/geolocation');
// getLocation();

const request = require('request');

const URI =
  'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBjucyjCeaC5ddig7Hd_RyzPrqWiBIwXhM';

const JSONbody = {
  homeMobileCountryCode: 525
};

request(
  {
    url: URI,
    method: 'POST',
    json: true, // <--Very important!!!
    body: JSONbody
  },
  function (error, response, body) {
    console.log(response.body.location.lat);
  }
);

const getDist = require('./routes/api/distance');
console.log(getDist('telok blangah blk 44', '21 lower kent ridge road'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
