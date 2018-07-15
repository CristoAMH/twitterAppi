const mongoose = require('mongoose');

let USERschema = mongoose.Schema({
    username : {
        type: String,
        require: [true, `You must insert a username`],
        unique: [true,'Username already exist' ]
    },
    name : String,
    email : {
        type: String,
        validate: {
            validator: function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            }
        },
        unique : true
    },
});

let USER = mongoose.model('users', USERschema);

module.exports = USER;