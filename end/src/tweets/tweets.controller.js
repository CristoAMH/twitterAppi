const fs = require('fs');

const getAllTweets =  (req, res) => {
    res.json(USERS.reduce(function(prev, users) {
       return [...prev,...users.tweets];
    },[]));
}

const getTweetByID =  (req,res) => {
    USERS.forEach(user => {
        res.json(user.tweets.find( tweet => tweet.id === req.params.id));
    })
}

const createTweet =  (req, res) => {
    req.body.id = 'tweet-' + Date.now();
    if(isTheOnlyTweet(USERS,req.body.id) === false){
        const newTweet = req.body;
        let USER = USERS.find(users => users.email === req.body.owner)
        USER.tweets.push(newTweet);
        fs.writeFile('./end/src/users/users.json', JSON.stringify(USERS))
        return res.json(newTweet);
    } else {
        return res.status(400).send(`Can't upload the tweet, The ID is already taken`)
    }
}

const isTheOnlyTweet = (users,idx) =>  users.some(user => user.tweets.some(tweet => tweet.id == idx))

module.exports = {
    getAllTweets,
    getTweetByID,
    createTweet
}