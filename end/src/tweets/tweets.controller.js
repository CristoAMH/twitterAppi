const tweetModel = require("./tweets.model")
const userModel = require("../users/users.model");

const getAllTweets =  (req, res) => {
    tweetModel.find()
        .then(response => {
            console.log(response);
            res.json(response);
        }).catch(err =>{
            console.log(err);
            res.status(400).send(err)
        })
}

const getTweetByID =  (req,res) => {
    tweetModel.find({_id : req.params.id})
        .then(response => {
            console.log(response);
            res.json(response)
        }).catch(err => {
            console.log(err);
            res.status(400).send(err);
        })
}

const createTweet =  (req, res) => {
    if(req.body && req.body.owner && req.body.text){
        if(userModel.findOne({username : req.body.owner}, (err, user) => {
            if (err) { res.status(400).send('That user doesnt exist') }
            if (user) {
                let newTweet = new tweetModel ({
                owner: req.body.owner,
                text : req.body.text,
                createdAt : Date.now()
                })
                newTweet.save(function (err) {
                    if (err) return res.status(406).send(err.message);
                    return res.status(201).json(newTweet);
                })
            } else {
                res.status(400).send('No user found');
            }
        }));
    }    
}
const deleteTweetById = (req, res) => {
    tweetModel.findOneAndRemove({_id : req.params.id})
        .then( resolve => {
        console.log(resolve);
        res.send(resolve)
    }).catch(err => {
        res.status(400).send('Invalid user ID')
    });
}

const getTweetsByUsername =  (username) => {
    return tweetModel.find({owner : username})
        .then( tweets => {
            return tweets;
        })
}

module.exports = {
    getAllTweets,
    getTweetByID,
    createTweet,
    deleteTweetById,
    getTweetsByUsername
}