const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
app.use(express.json());

//Import Routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

//Middlewares
//app.use(auth);
app.use(cors());

//ROUTE
app.get('/', (req, res) =>{
    res.send('We are on home');
});



//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true },
    ()=> console.log('connected to DB'));

//Start listening to server
app.listen(3000);