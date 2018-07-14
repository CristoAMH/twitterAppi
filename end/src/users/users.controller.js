const USERmodel = require('./users.model');

const fs = require('fs')

const USERS = JSON.parse(fs.readFileSync(__dirname + '/users.json') );

const getAllUsers = (req, res) => {
    USERmodel.find()
        .then(response => {
            console.log(response);
            res.json(response);
        }).catch(err =>{
            console.log(err);
            res.status(400).send(err)
        })
}
const getUserByID = (req, res) => {
    USERmodel.find({_id : req.params.id})
        .then(response => {
            console.log(response);
            res.json(response)
        }).catch(err => {
            console.log(err);
            res.status(400).send(err);
        })
}

const createUser =  (req, res) => {
    let newUser = new USERmodel({
        username: req.body.username,
        name: req.body.name,
        email : req.body.email
    })
    let error = newUser.validateSync();
    if(error && error.errors){
        console.log(error);
        res.status(400).send(`Invalid user datas`)
    } else {
        newUser.save();
        res.json(newUser);
    }
}

const removeUserById = (req,res) =>{
    if(req.params.username){
        const removeIndex = USERS.map(function(users) { return users.username; }).indexOf(req.params.username);
        console.log(removeIndex);
        // remove object
        if(removeIndex !== -1){
            USERS.splice(removeIndex, 1);
            fs.writeFile(__dirname + '/users.json',JSON.stringify(USERS))
            res.status(200).send('User removed prefectly');
        }else {
            res.status(400).send('Invalid username')
        }
    } 
    
}

const changeUserData = (req,res) => {
    let USER = USERS.find(users => users.username === req.params.username)
    if(USER){
        if(req.body.email){
            USER.email = req.body.email;
            USER.tweets.forEach(tweet => tweet.owner = req.body.email)
            res.status(200).send(`Email changed perfectly`)
        } 
        if(req.body.name){
            USER.name = req.body.name;
            res.status(200).send(`Name changed perfecly`)
        }
    } else {
        res.status(400).send('User not found')
    }
}


module.exports = {
    getAllUsers,
    getUserByID,
    createUser,
    removeUserById,
    changeUserData
}