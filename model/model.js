var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    local: {
        username: String,
        password: String,
        like: Boolean
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String,
        like: Boolean,
        local : {
            like : Boolean
        }
    },
    twitter: {
        id: String,
        email: String,
        name:String,
        like: Boolean,
        local : {
            like : Boolean
        }
    }
});


module.exports = mongoose.model('User', userSchema);
