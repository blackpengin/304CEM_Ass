const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
require('dotenv').config();




//Import Routes
const authRoute = require('./routes/auth');
const itemRoute = require('./routes/items');
const creditRoute = require('./routes/credits');
const receiptRoute = require('./routes/receipts');

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/items', itemRoute);
app.use('/api/credits', creditRoute);
app.use('/api/receipts', receiptRoute);

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log('connected to DB'));

app.listen(3000, () => console.log('Server Up and running'));