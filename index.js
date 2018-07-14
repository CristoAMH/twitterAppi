const express = require('express');
const app = express();
const usersRouter = require('./end/src/users/index');
const tweetsRouter = require('./end/src/tweets/index');
const mongoose = require('mongoose');

const config = require('./.env');
const options = config[process.env.NODE_ENV];
const _PORT = options.PORT;



mongoose.connect('mongodb://localhost/twitterAppi' );

app.use(express.json());

//los dos middlewares
/* const myEmail = require('./email')
const errorhandler = require('errorhandler');



app.use(errorhandler({log: errorNotification}))

function errorNotification(err, str, req){
    myEmail.mailOptions.html = `
        <h1>Error in ${req.method} ${req.url}</h1>
        <h2>This was the error : ${err}</h2>
        `
    myEmail.transporter.sendMail(myEmail.mailOptions, (err,info) => {
        if(error){
            console.log(err);
        } else {
            console.log(info)
        }
    })
}
 */

app.use('/users', usersRouter);

// functiones de tweets
app.use('/tweets', tweetsRouter);
app.listen(_PORT);
