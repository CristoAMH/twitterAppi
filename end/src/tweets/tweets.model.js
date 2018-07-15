const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    owner : {
        type: String,
        require: [true, `Is required an owner`],
    },
    text : {
        type: String,
        require: [true, 'You must insert some text']
    },
    createdAt : {
        type: Number,
        require: [true]
    }  
});

let TWEET = mongoose.model('tweets',tweetSchema );

module.exports = TWEET;