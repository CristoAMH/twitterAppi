const express = require('express');
const app = express();
const usersRouter = require('./end/src/users/index');
const tweetsRouter = require('./end/src/tweets/index');
const mongoose = require('mongoose');
const morgan = require('morgan');
const compression = require('compression');

const config = require('./.env');
const options = config[process.env.NODE_ENV];
const _PORT = options.PORT;



mongoose.connect('mongodb://localhost/twitterAppi' );

app.use(express.json());

//Los middlewares
app.use(morgan('combined'));
app.use(compression())

app.use('/users', usersRouter);

// functiones de tweets
app.use('/tweets', tweetsRouter);
app.listen(_PORT);
