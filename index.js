const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
require('dotenv').config();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods',
        'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers',
        '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin',
        'http://localhost:3001');
    if (req.method === 'OPTIONS') {
        res.status(200);
    } next();
})

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