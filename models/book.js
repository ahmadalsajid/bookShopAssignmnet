const mongoose  = require('mongoose'),
    bcrypt    = require('bcrypt-nodejs');

var readerSchema = mongoose.Schema({
    _id         : Schema.Types.ObjectId,
    title       : String,
    bookPath    : String,
    samplePath  : String,
    ISBN        : String,
    publishDate : {type: Date,  default: Date.now()},
    publisher : {
        _id     : Schema.Types.ObjectId,
        name    : String,
        address : String,
        contact : [String]
    },
    Author      : {
        name        : String,
        otherBoooks : [Schema.Types.ObjectId]
    },
    genre_tags  : [String],
    unitPrice   : Number,
    coverImage  : String,
    comments    : [
        {
            userID  : Schema.Types.ObjectId ,
            text    : String
        }
    ],
});


module.exports = mongoose.model('Book', userSchema);