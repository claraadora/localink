const express = require('express');
const connectDB = require('./config/db');
const app = express();

//Connect Database
connectDB();

// Init Middleware
app.use(express.json());

app.get('/', (req, res) => res.send('API running'));

//Define routes for businesses
app.use('/business', require('./routes/api/business/index'));
app.use('/business/auth', require('./routes/api/business/auth'));

//Define routes for shoppers
app.use('/', require('./routes/api/shopper/index'));
app.use('/auth', require('./routes/api/shopper/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
