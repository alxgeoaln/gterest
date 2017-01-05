var mongoose = require('mongoose');


var likePictureSchema = mongoose.Schema({
    imageId: String,
    userId: String
});

module.exports = mongoose.model('likePicture', likePictureSchema);