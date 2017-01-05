var mongoose = require('mongoose');

var gterestSchema = mongoose.Schema({
    image: String,
    title: String,
    author: String,
    raiting: String,
    id: String
});

module.exports = mongoose.model('Gterest', gterestSchema);