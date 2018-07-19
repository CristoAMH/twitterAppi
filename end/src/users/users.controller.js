const USERmodel = require('./users.model');
const {getTweetsByUsername} = require("../tweets/tweets.controller")

const getAllUsers = (req, res) => {
    USERmodel.find({},{},{lean : true})
        .then(response => {
            console.log('1st response ->', response)
            response.forEach(user => {
                console.log('users ->', user)
                getTweetsByUsername(user.username)
                    .then( tweets => { 
                        user.tweets = tweets;
                        console.log('User tweets ->', user.tweets)
                        console.log('final response ->', response)
                        res.render('users', {users : response});
                })
            })
            /* 
            console.log(response);
            res.render('users', {users : response}); */
        }).catch(err =>{
            console.log(err);
            res.status(400).send(err)
        })
}

const  getUserByUsername = (req, res) => {
	USERmodel.findOne({username : req.params.username},{},{lean : true})
		.then( user => {
           getTweetsByUsername(req.params.username)
			 .then( tweets => { 
                user.tweets = tweets;
				res.render('user', {user : user});
		   })
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
            res.send('user deleted')
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
}


module.exports = {
    getAllUsers,
    getUserByUsername,
    createUser,
    removeUserById,
    changeUserData
}