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
    USERmodel.findOneAndRemove({_id : req.params.id})
        .then( resolve => {
            console.log(resolve);
            res.send(resolve)
        }).catch(err => {
            res.status(400).send('Invalid user ID')
        })
}

const changeUserData = (req,res) => {
    if(req.body){
        if(req.body.email && !req.body.name){
            USERmodel.findByIdAndUpdate(req.params.id, {$set : {email : req.body.email}}, {runValidators : true})
            .then( response => {
                res.send('email changed perfectly')
            }).catch( err => {
                res.status(400).send('Impossible to change the email')
            })
        } else if (!req.body.email && req.body.name){
            USERmodel.findByIdAndUpdate(req.params.id, {$set : {name : req.body.name}})
                .then( response => {
                    res.send('name changed perfectly')
                }).catch( err => {
                    res.status(400).send('Impossible to change the name')
                })
        } else if (req.body.email && req.body.name){
            USERmodel.findByIdAndUpdate(req.params.id, {$set : {name : req.body.name, email : req.body.email}}, {runValidators : true})
                .then( response => {
                    res.send('name and email changed perfectly')
                }).catch( err => {
                    res.status(400).send('Impossible to change the name or the email')
                })
        }else {
            res.status(400).send('invalid data')
        }
    }
    
    /* let USER = USERS.find(users => users.username === req.params.username)
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
    } */
}


module.exports = {
    getAllUsers,
    getUserByID,
    createUser,
    removeUserById,
    changeUserData
}